# This service provides mock data that exactly matches what the frontend components expect.
# Once PostgreSQL is added, these functions will be replaced with real SQLAlchemy ORM queries.

class MockDataService:
    @staticmethod
    def get_patient_dashboard_stats():
        return {
            "stats": [
                {"title": "Reports Uploaded", "value": "12", "trend": {"value": "2 this month", "positive": True}},
                {"title": "Biomarkers Tracked", "value": "48", "trend": {"value": "8 new", "positive": True}},
                {"title": "Active Alerts", "value": "3", "subtitle": "2 moderate, 1 high", "trend": None},
                {"title": "Next Checkup", "value": "Mar 22", "subtitle": "Lipid Panel", "trend": None}
            ],
            "health_score": 74
        }

    @staticmethod
    def get_patient_reports():
         return [
            {"id": "1", "name": "CBC_Report_Mar2026.pdf", "date": "Mar 05, 2026", "status": "processed", "size": "2.4 MB", "type": "Blood Test", "extracted_params": 15, "ai_insights": 3},
            {"id": "2", "name": "LipidPanel_Feb2026.pdf", "date": "Feb 20, 2026", "status": "processed", "size": "1.8 MB", "type": "Biochemistry", "extracted_params": 8, "ai_insights": 2},
            {"id": "3", "name": "ThyroidProfile.jpg", "date": "Feb 10, 2026", "status": "processed", "size": "3.1 MB", "type": "Hormone Panel", "extracted_params": 6, "ai_insights": 1},
            {"id": "4", "name": "LiverFunction_Jan.pdf", "date": "Jan 15, 2026", "status": "processed", "size": "1.5 MB", "type": "Biochemistry", "extracted_params": 12, "ai_insights": 2},
            {"id": "5", "name": "VitaminD_Dec2025.pdf", "date": "Dec 05, 2025", "status": "processed", "size": "1.2 MB", "type": "Vitamin Test", "extracted_params": 1, "ai_insights": 1},
        ]
        
    @staticmethod
    def get_patient_insights():
        return {
            "active_alerts": [
                {"id": 1, "type": "high", "biomarker": "LDL Cholesterol", "value": "165 mg/dL", "target": "< 100 mg/dL", "date": "Feb 20, 2026", "message": "Your LDL cholesterol is significantly above the target range."},
                {"id": 2, "type": "moderate", "biomarker": "Fasting Glucose", "value": "108 mg/dL", "target": "< 100 mg/dL", "date": "Mar 05, 2026", "message": "Your fasting glucose is slightly elevated (prediabetic range)."},
                {"id": 3, "type": "moderate", "biomarker": "Vitamin D", "value": "22 ng/mL", "target": "30-100 ng/mL", "date": "Dec 05, 2025", "message": "Your Vitamin D levels are insufficient."}
            ],
            "positive_trends": [
                {"id": 1, "biomarker": "HDL Cholesterol", "trend": "+12%", "message": "Your good cholesterol has improved since your last test."},
                {"id": 2, "biomarker": "Triglycerides", "trend": "-15%", "message": "Your triglycerides have decreased, moving closer to the optimal range."}
            ],
            "recommendations": [
                {"id": 1, "category": "Diet", "title": "Reduce Saturated Fats", "description": "Limit red meat and full-fat dairy to help lower your LDL cholesterol.", "impact": "High Impact"},
                {"id": 2, "category": "Activity", "title": "Increase Aerobic Exercise", "description": "Aim for 150 minutes of moderate aerobic activity per week to improve cardiovascular health.", "impact": "Medium Impact"},
                {"id": 3, "category": "Supplement", "title": "Consider Vitamin D3", "description": "Discuss a Vitamin D3 supplement with your doctor to address the insufficiency.", "impact": "Medium Impact"}
            ]
        }
        
    @staticmethod
    def get_patient_notifications():
        return [
           {"id": 1, "title": "New report processed", "message": "Your CBC_Report_Mar2026.pdf has been successfully analyzed.", "timestamp": "2 hours ago", "read": False, "type": "report"},
           {"id": 2, "title": "Health Alert", "message": "Your fasting glucose is slightly elevated.", "timestamp": "1 day ago", "read": False, "type": "alert"},
           {"id": 3, "title": "Upcoming Checkup", "message": "Reminder: Lipid Panel test scheduled for Mar 22.", "timestamp": "3 days ago", "read": True, "type": "reminder"},
           {"id": 4, "title": "New AI Insight", "message": "We've generated new dietary recommendations based on your latest reports.", "timestamp": "1 week ago", "read": True, "type": "insight"}
        ]

    @staticmethod
    def get_diagnostic_dashboard_stats():
        return {
            "stats": {
                "todays_bookings": 42,
                "pending_reports": 14,
                "patients_served": 128,
                "todays_revenue": 45000
            },
            "bookings": [
                {"id": 1, "patient": "John Doe", "test": "Complete Blood Count", "time": "09:00 AM", "status": "confirmed"},
                {"id": 2, "patient": "Sarah Smith", "test": "Lipid Panel", "time": "10:30 AM", "status": "processing"},
                {"id": 3, "patient": "Mike Johnson", "test": "Thyroid Profile", "time": "11:15 AM", "status": "pending"},
                {"id": 4, "patient": "Emily Davis", "test": "HbA1c", "time": "02:00 PM", "status": "confirmed"}
            ],
            "testDistribution": [
                {"name": "CBC", "value": 35, "color": "hsl(217, 91%, 60%)"},
                {"name": "Lipid Panel", "value": 25, "color": "hsl(142, 71%, 45%)"},
                {"name": "Thyroid", "value": 20, "color": "hsl(43, 74%, 66%)"},
                {"name": "Others", "value": 20, "color": "hsl(220, 14%, 28%)"}
            ],
            "revenueData": [
                {"day": "Mon", "revenue": 12000},
                {"day": "Tue", "revenue": 15000},
                {"day": "Wed", "revenue": 18000},
                {"day": "Thu", "revenue": 14000},
                {"day": "Fri", "revenue": 21000},
                {"day": "Sat", "revenue": 25000},
                {"day": "Sun", "revenue": 19000}
            ],
            "recentReports": [
                {"patient": "Jane Smith", "test": "Lipid Panel", "status": "processed", "confidence": 98},
                {"patient": "Robert Brown", "test": "Liver Function", "status": "processing", "confidence": None},
                {"patient": "Jessica Taylor", "test": "Vitamin D", "status": "uploaded", "confidence": None}
            ]
        }

    @staticmethod
    def get_diagnostic_patients():
         return [
            {"id": "PT-2026-001", "name": "John Doe", "age": 45, "gender": "Male", "lastVisit": "2026-03-05", "reports": 12, "status": "active"},
            {"id": "PT-2026-002", "name": "Sarah Smith", "age": 32, "gender": "Female", "lastVisit": "2026-02-28", "reports": 4, "status": "active"},
            {"id": "PT-2026-003", "name": "Mike Johnson", "age": 58, "gender": "Male", "lastVisit": "2026-03-10", "reports": 8, "status": "active"},
            {"id": "PT-2026-004", "name": "Emily Davis", "age": 27, "gender": "Female", "lastVisit": "2025-11-15", "reports": 2, "status": "inactive"},
            {"id": "PT-2026-005", "name": "Robert Brown", "age": 63, "gender": "Male", "lastVisit": "2026-01-20", "reports": 15, "status": "active"},
            {"id": "PT-2026-006", "name": "Jessica Taylor", "age": 41, "gender": "Female", "lastVisit": "2026-03-08", "reports": 6, "status": "active"},
            {"id": "PT-2026-007", "name": "William Wilson", "age": 50, "gender": "Male", "lastVisit": "2025-09-10", "reports": 9, "status": "inactive"},
            {"id": "PT-2026-008", "name": "Olivia Moore", "age": 35, "gender": "Female", "lastVisit": "2026-02-14", "reports": 5, "status": "active"}
        ]

    @staticmethod
    def get_diagnostic_reports():
        return [
            {"id": "RPT-1001", "patient": "John Doe", "patientId": "PT-2026-001", "type": "Complete Blood Count", "date": "2026-03-05", "status": "Processed", "aiConfidence": 98},
            {"id": "RPT-1002", "patient": "Sarah Smith", "patientId": "PT-2026-002", "type": "Lipid Panel", "date": "2026-03-04", "status": "Processed", "aiConfidence": 95},
            {"id": "RPT-1003", "patient": "Mike Johnson", "patientId": "PT-2026-003", "type": "Thyroid Profile", "date": "2026-03-04", "status": "Processing", "aiConfidence": None},
            {"id": "RPT-1004", "patient": "Emily Davis", "patientId": "PT-2026-004", "type": "HbA1c", "date": "2026-03-02", "status": "Processed", "aiConfidence": 99},
            {"id": "RPT-1005", "patient": "Robert Brown", "patientId": "PT-2026-005", "type": "Liver Function Test", "date": "2026-03-01", "status": "Failed", "aiConfidence": None},
            {"id": "RPT-1006", "patient": "Jessica Taylor", "patientId": "PT-2026-006", "type": "Kidney Function Test", "date": "2026-02-28", "status": "Processed", "aiConfidence": 94},
            {"id": "RPT-1007", "patient": "William Wilson", "patientId": "PT-2026-007", "type": "Vitamin D", "date": "2026-02-25", "status": "Processed", "aiConfidence": 97}
        ]

    @staticmethod
    def get_diagnostic_bookings():
        return [
            {"id": "BK-5001", "patient": "John Doe", "test": "Complete Blood Count", "date": "Tomorrow, 09:00 AM", "status": "Confirmed"},
            {"id": "BK-5002", "patient": "Sarah Smith", "test": "Lipid Panel", "date": "Tomorrow, 10:30 AM", "status": "Pending"},
            {"id": "BK-5003", "patient": "Mike Johnson", "test": "Thyroid Profile", "date": "Mar 20, 08:15 AM", "status": "Confirmed"},
            {"id": "BK-5004", "patient": "Emily Davis", "test": "HbA1c", "date": "Mar 20, 11:00 AM", "status": "Cancelled"},
            {"id": "BK-5005", "patient": "Robert Brown", "test": "Liver Function Test", "date": "Mar 21, 09:45 AM", "status": "Confirmed"}
        ]

    @staticmethod
    def get_diagnostic_notifications():
        return [
           {"id": 1, "title": "New report uploaded", "message": "Report CBC_Report_Mar2026.pdf was uploaded by a patient.", "timestamp": "10 mins ago", "read": False, "type": "report"},
           {"id": 2, "title": "Processing Error", "message": "OCR failed for LipidPanel_Feb2026.pdf. Manual review required.", "timestamp": "1 hour ago", "read": False, "type": "alert"},
           {"id": 3, "title": "System Update", "message": "The diagnostic AI engine was updated to version 2.4.", "timestamp": "1 day ago", "read": True, "type": "system"},
           {"id": 4, "title": "Weekly Summary", "message": "Your lab processed 142 reports this week. Great job!", "timestamp": "3 days ago", "read": True, "type": "info"}
        ]

    @staticmethod
    def get_admin_dashboard_stats():
        return {
            "stats": {
                "total_users": 15420,
                "reports_processed": 45890,
                "flagged_reports": 12,
                "active_centers": 85
            },
            "userGrowth": [
                {"month": "Jan", "users": 8000},
                {"month": "Feb", "users": 9500},
                {"month": "Mar", "users": 12000},
                {"month": "Apr", "users": 14000},
                {"month": "May", "users": 15420}
            ],
            "healthTrends": [
                {"subject": "Diabetes", "A": 120, "fullMark": 150},
                {"subject": "Anemia", "A": 98, "fullMark": 150},
                {"subject": "Thyroid", "A": 86, "fullMark": 150},
                {"subject": "Cardiac", "A": 99, "fullMark": 150},
                {"subject": "Renal", "A": 85, "fullMark": 150},
                {"subject": "Liver", "A": 65, "fullMark": 150}
            ],
            "flaggedReports": [
                {"id": 1, "patient": "John Doe", "lab": "City Lab", "issue": "Missing Parameters", "score": 45, "status": "flagged"},
                {"id": 2, "patient": "Jane Smith", "lab": "Central Health", "issue": "Invalid Range", "score": 20, "status": "review"}
            ],
            "deficiencyData": [
                {"name": "Vitamin D", "count": 1200},
                {"name": "Iron", "count": 980},
                {"name": "B12", "count": 860},
                {"name": "Calcium", "count": 650}
            ],
            "recentUsers": [
                {"name": "Alice Cooper", "role": "Patient", "status": "active", "joined": "Today"},
                {"name": "City Lab", "role": "Center", "status": "pending", "joined": "Yesterday"}
            ]
        }

    @staticmethod
    def get_admin_users():
        return [
            {"id": "usr-1", "name": "Alice Cooper", "email": "alice@example.com", "role": "Patient", "status": "active", "joined": "2023-11-20", "reports": 5},
            {"id": "usr-2", "name": "City Lab", "email": "contact@citylab.com", "role": "Diagnostic Center", "status": "pending", "joined": "2024-01-10", "reports": 142},
            {"id": "usr-3", "name": "Dr. Sarah Smith", "email": "dr.smith@example.com", "role": "Doctor", "status": "active", "joined": "2023-08-15", "reports": 0},
            {"id": "usr-4", "name": "John Doe", "email": "john.doe@example.com", "role": "Patient", "status": "suspended", "joined": "2024-02-01", "reports": 2},
            {"id": "usr-5", "name": "Central Health", "email": "admin@centralhealth.com", "role": "Diagnostic Center", "status": "active", "joined": "2023-05-12", "reports": 850}
        ]

    @staticmethod
    def get_admin_notifications():
        return [
           {"id": 1, "title": "New Center Registration", "message": "Global Diagnostics has submitted registration for approval.", "timestamp": "30 mins ago", "read": False, "type": "info"},
           {"id": 2, "title": "Security Alert", "message": "Multiple failed login attempts detected for Admin user ID 405.", "timestamp": "2 hours ago", "read": False, "type": "security"},
           {"id": 3, "title": "Database Maintenance", "message": "Scheduled database compaction will begin at 02:00 AM UTC.", "timestamp": "4 hours ago", "read": True, "type": "system"},
           {"id": 4, "title": "System Update Complete", "message": "AI diagnostic core updated to model v4.2.1 successfully.", "timestamp": "1 day ago", "read": True, "type": "insight"}
        ]

    @staticmethod
    def get_biomarkers():
        return [
            {
                "id": "heart",
                "label": "Cardiovascular",
                "count": 1,
                "description": "Biomarkers related to heart health and lipid profiles.",
                "markers": [
                    {
                        "name": "LDL Cholesterol",
                        "panels": ["Lipid Panel"],
                        "desc": "Low-density lipoprotein (LDL) is often called 'bad' cholesterol. High levels can lead to plaque buildup in arteries. Elevated LDL is a major risk factor for coronary heart disease and stroke.",
                        "inputs": []
                    }
                ]
            },
            {
                "id": "metabolism",
                "label": "Metabolic",
                "count": 1,
                "description": "Biomarkers measuring blood sugar and insulin resistance.",
                "markers": [
                    {
                        "name": "Fasting Glucose",
                        "panels": ["Basic Metabolic Panel"],
                        "desc": "Measures the amount of sugar (glucose) in your blood after an overnight fast. Used to detect diabetes or prediabetes. Consistent elevation indicates insulin resistance.",
                        "inputs": []
                    }
                ]
            },
            {
                "id": "blood",
                "label": "Hematology",
                "count": 1,
                "description": "Metrics relating to your red and white blood cells.",
                "markers": [
                    {
                        "name": "Hemoglobin",
                        "panels": ["Complete Blood Count"],
                        "desc": "The protein in red blood cells that carries oxygen from your lungs to the rest of your body. Low levels indicate anemia, while high levels might indicate polycythemia or dehydration.",
                        "inputs": []
                    }
                ]
            }
        ]
