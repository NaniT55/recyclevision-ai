from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Float,
)

from sqlalchemy.ext.declarative import (
    declarative_base,
)

from sqlalchemy.orm import (
    sessionmaker,
)

DATABASE_URL = "sqlite:///./reports.db"

engine = create_engine(
    DATABASE_URL,

    connect_args={
        "check_same_thread": False
    }
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()

# TABLE

class Report(Base):

    __tablename__ = "reports"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    batch_id = Column(String)

    bottle_count = Column(Integer)

    pet_percentage = Column(Float)

    quality_score = Column(Float)

    contamination_risk = Column(String)

    batch_grade = Column(String)

    confidence_score = Column(Float)

    timestamp = Column(String)

# CREATE TABLE

Base.metadata.create_all(
    bind=engine
)