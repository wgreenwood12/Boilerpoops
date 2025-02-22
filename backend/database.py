# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# import os
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# # Read database credentials from .env file
# DB_USER = os.getenv("DB_USER", "root")
# DB_PASSWORD = os.getenv("DB_PASSWORD", "lebron123")
# DB_HOST = os.getenv("DB_HOST", "localhost")
# DB_PORT = os.getenv("DB_PORT", "3306")
# DB_NAME = os.getenv("DB_NAME", "boilerdump")

# # MySQL connection URL
# DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
# # DATABASE_URL = "mysql+pymysql://root@localhost/boilerdump"

# print(DATABASE_URL)
# # Create the database engine
# engine = create_engine(DATABASE_URL, pool_pre_ping=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# # Dependency to get a database session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
