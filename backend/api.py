"""
api.py
FastAPI REST API for RecycleVision
"""

from fastapi import (
    FastAPI,
    File,
    UploadFile,
    HTTPException,
)

from fastapi.middleware.cors import (
    CORSMiddleware,
)

from fastapi.responses import (
    FileResponse,
    JSONResponse,
)

from dotenv import load_dotenv

import uvicorn
import shutil
import json
import os
import uuid

from pathlib import Path
from datetime import datetime

# LOAD ENV

load_dotenv()

# IMPORT ANALYZER

from analyzer import (
    analyze_image,
    save_report,
)

# IMPORT DATABASE

from database import (
    SessionLocal,
    Report,
)

# =========================================
# FASTAPI APP
# =========================================

app = FastAPI(

    title="RecycleVision API",

    description=
    "AI-powered recycling material analysis system",

    version="1.0.0",
)

# =========================================
# CORS
# =========================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================================
# DIRECTORIES
# =========================================

UPLOAD_DIR = Path(
    "uploads"
)

UPLOAD_DIR.mkdir(
    exist_ok=True
)

REPORTS_DIR = Path(
    "sample_outputs"
)

REPORTS_DIR.mkdir(
    exist_ok=True
)

# =========================================
# ROOT
# =========================================

@app.get("/")
async def root():

    return {

        "message":
        "RecycleVision API",

        "version":
        "1.0.0",

        "docs":
        "/docs",
    }

# =========================================
# HEALTH
# =========================================

@app.get("/health")
async def health():

    return {

        "status":
        "healthy",

        "timestamp":
        datetime.now().isoformat(),
    }

# =========================================
# ANALYZE IMAGE
# =========================================

@app.post("/analyze/single")
async def analyze_single(
    file: UploadFile = File(...)
):
    """
    Analyze single recycling image
    """

    # VALIDATE FILE

    if not file.content_type.startswith(
        "image/"
    ):

        raise HTTPException(

            status_code=400,

            detail=
            "Only image files are supported",
        )

    # GENERATE BATCH ID

    batch_id = (

        f"BATCH-"

        f"{datetime.now().strftime('%Y%m%d-%H%M%S')}-"

        f"{str(uuid.uuid4())[:8].upper()}"
    )

    # FILE EXTENSION

    ext = (
        Path(file.filename).suffix
        or ".jpg"
    )

    # SAVE IMAGE

    save_path = (
        UPLOAD_DIR /
        f"{batch_id}{ext}"
    )

    with open(
        save_path,
        "wb"
    ) as f:

        shutil.copyfileobj(
            file.file,
            f
        )

    try:

        # =========================================
        # RUN AI ANALYSIS
        # =========================================

        result = analyze_image(
            str(save_path),

            batch_id=batch_id,
        )

        # =========================================
        # SAVE JSON REPORT
        # =========================================

        report_path = save_report(

            result,

            str(
                REPORTS_DIR /
                f"{batch_id}_report.json"
            ),
        )

        result["report_path"] = (
            report_path
        )

        # =========================================
        # SAVE TO DATABASE
        # =========================================

        db = SessionLocal()

        report = Report(

            batch_id=result.get(
                "batch_id"
            ),

            bottle_count=result.get(
                "bottle_count"
            ),

            pet_percentage=result.get(
                "pet_percentage"
            ),

            quality_score=result.get(
                "quality_score"
            ),

            contamination_risk=result.get(
                "contamination_risk"
            ),

            batch_grade=result.get(
                "batch_grade"
            ),

            confidence_score=result.get(
                "confidence_score"
            ),

            timestamp=result.get(
                "analysis_timestamp"
            ),
        )

        db.add(report)

        db.commit()

        db.close()

        # =========================================
        # RETURN RESPONSE
        # =========================================

        return JSONResponse(
            content=result
        )

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=
            f"Analysis failed: {str(e)}",
        )

    finally:

        # DELETE TEMP IMAGE

        if save_path.exists():

            os.unlink(save_path)

# =========================================
# LIST REPORTS
# =========================================

@app.get("/reports")
async def list_reports():
    """
    Get all reports from database
    """

    db = SessionLocal()

    reports = db.query(
        Report
    ).all()

    result = []

    for r in reports:

        result.append({

            "batch_id":
            r.batch_id,

            "timestamp":
            r.timestamp,

            "grade":
            r.batch_grade,

            "bottle_count":
            r.bottle_count,

            "pet_percentage":
            r.pet_percentage,

            "quality_score":
            r.quality_score,

            "confidence_score":
            r.confidence_score,
        })

    db.close()

    return sorted(

        result,

        key=lambda x:
        x.get(
            "timestamp",
            ""
        ),

        reverse=True,
    )

# =========================================
# DOWNLOAD REPORT
# =========================================

@app.get("/reports/{batch_id}")
async def get_report(
    batch_id: str
):
    """
    Download report JSON
    """

    report_path = (

        REPORTS_DIR /

        f"{batch_id}_report.json"
    )

    if not report_path.exists():

        raise HTTPException(

            status_code=404,

            detail=
            "Report not found",
        )

    return FileResponse(

        str(report_path),

        media_type=
        "application/json",
    )

# =========================================
# RUN SERVER
# =========================================

if __name__ == "__main__":

    uvicorn.run(

        "api:app",

        host="0.0.0.0",

        port=8000,

        reload=True,
    )