import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

// Encryption helper for sensitive counseling notes
function encrypt(text: string): string {
  const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET_KEY || "aetheris_secret_key_min_32_bytes_safe_2026";
  const iv = crypto.randomBytes(12);
  const key = crypto.scryptSync(ENCRYPTION_KEY, "aetheris_salt", 32);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

async function main() {
  console.log("🌱 Cleaning existing database...");
  await prisma.auditLog.deleteMany();
  await prisma.sELMoodLog.deleteMany();
  await prisma.feeInvoice.deleteMany();
  await prisma.busAttendance.deleteMany();
  await prisma.busStop.deleteMany();
  await prisma.busRoute.deleteMany();
  await prisma.substitutionRecord.deleteMany();
  await prisma.curriculumUnit.deleteMany();
  await prisma.socraticSession.deleteMany();
  await prisma.mTSSIntervention.deleteMany();
  await prisma.mTSSFlag.deleteMany();
  await prisma.gradeRecord.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.attendanceRecord.deleteMany();
  await prisma.timetableSlot.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.staffProfile.deleteMany();
  await prisma.parentProfile.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.classSection.deleteMany();
  await prisma.user.deleteMany();
  await prisma.school.deleteMany();

  console.log("🏫 Creating School...");
  const school = await prisma.school.create({
    data: {
      name: "Aetheris International Academy",
      code: "AIA-BLR-01",
      address: "Survey 42/1, Sarjapur Outer Ring Road, Bengaluru, Karnataka 560103",
      curriculum: "CBSE & International Baccalaureate",
    },
  });

  console.log("👥 Creating 7 Core Demo Users...");
  const defaultPassword = await bcrypt.hash("Aetheris@2026", 10);

  // 1. Admin
  const adminUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "admin@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Aditi Rao",
      role: "ADMIN",
      phone: "+91 98801 11222",
      languagePref: "en",
    },
  });

  // 2. Principal
  const principalUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "principal@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Dr. Sunita Kulkarni",
      role: "PRINCIPAL",
      phone: "+91 98802 33445",
      languagePref: "en",
      staffProfile: {
        create: {
          employeeCode: "EMP-001",
          designation: "Principal & Head of School",
          department: "Administration",
          specializations: JSON.stringify(["Educational Leadership", "Curriculum Design"]),
          maxWeeklyHours: 20,
          currentHours: 12,
        },
      },
    },
  });

  // 3. Teacher (Vikram Rathore - Math)
  const teacherUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "teacher@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Vikram Rathore",
      role: "TEACHER",
      phone: "+91 98803 55667",
      languagePref: "en",
      staffProfile: {
        create: {
          employeeCode: "EMP-104",
          designation: "Senior Mathematics Educator",
          department: "Mathematics & Computing",
          specializations: JSON.stringify(["Linear Algebra", "Calculus", "Data Science"]),
          maxWeeklyHours: 28,
          currentHours: 22,
        },
      },
    },
  });

  // Additional Teachers for Substitution Engine
  const scienceTeacher = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "priya.patel@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Priya Patel",
      role: "TEACHER",
      phone: "+91 98804 77889",
      languagePref: "en",
      staffProfile: {
        create: {
          employeeCode: "EMP-108",
          designation: "Physics Educator",
          department: "Science",
          specializations: JSON.stringify(["Physics", "Applied Mathematics"]),
          maxWeeklyHours: 28,
          currentHours: 18,
        },
      },
    },
  });

  const mathTeacher2 = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "rohan.verma@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Rohan Verma",
      role: "TEACHER",
      phone: "+91 98805 99001",
      languagePref: "en",
      staffProfile: {
        create: {
          employeeCode: "EMP-112",
          designation: "Mathematics Educator",
          department: "Mathematics & Computing",
          specializations: JSON.stringify(["Geometry", "Statistics"]),
          maxWeeklyHours: 28,
          currentHours: 16,
        },
      },
    },
  });

  // 4. Parent (Meera Iyer)
  const parentUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "parent@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Meera Iyer",
      role: "PARENT",
      phone: "+91 98806 12345",
      languagePref: "kn", // Kannada preference to test multilingual
      parentProfile: {
        create: {
          occupation: "Architect & Urban Designer",
        },
      },
    },
  });

  // 5. Accountant (Suresh Nair)
  const accountantUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "accountant@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Suresh Nair",
      role: "ACCOUNTANT",
      phone: "+91 98807 23456",
      languagePref: "en",
      staffProfile: {
        create: {
          employeeCode: "EMP-045",
          designation: "Chief Financial Officer",
          department: "Finance & Accounts",
          specializations: JSON.stringify(["Financial Accounting", "Audit Compliance"]),
          maxWeeklyHours: 35,
          currentHours: 30,
        },
      },
    },
  });

  // 6. Transport Attendant / Driver (Ramesh Gowda)
  const transportUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "transport@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Ramesh Gowda",
      role: "TRANSPORT",
      phone: "+91 98808 34567",
      languagePref: "kn",
      staffProfile: {
        create: {
          employeeCode: "EMP-088",
          designation: "Fleet Transit Supervisor",
          department: "Transport & Logistics",
          specializations: JSON.stringify(["Route Navigation", "Student Safety Protocol"]),
          maxWeeklyHours: 40,
          currentHours: 32,
        },
      },
    },
  });

  console.log("🚌 Creating Bus Routes & Stops...");
  const busRoute4 = await prisma.busRoute.create({
    data: {
      schoolId: school.id,
      routeNumber: "Route 04 (Outer Ring Road Express)",
      driverName: "Manjunath K",
      driverPhone: "+91 98809 45678",
      attendantName: "Ramesh Gowda",
      vehicleNumber: "KA-01-MJ-8822",
      currentLat: 12.9279,
      currentLng: 77.6771,
      lastPing: new Date(),
      status: "IN_TRANSIT",
      stops: {
        create: [
          { stopName: "Koramangala Sony Signal", sequenceOrder: 1, scheduledTime: "07:20 AM", lat: 12.9352, lng: 77.6245 },
          { stopName: "HSR Layout 14th Main", sequenceOrder: 2, scheduledTime: "07:35 AM", lat: 12.9121, lng: 77.6446 },
          { stopName: "Bellandur EcoSpace", sequenceOrder: 3, scheduledTime: "07:48 AM", lat: 12.9279, lng: 77.6771 },
          { stopName: "Sarjapur Campus Gate 1", sequenceOrder: 4, scheduledTime: "08:15 AM", lat: 12.9056, lng: 77.7123 },
        ],
      },
    },
    include: { stops: true },
  });

  console.log("🏫 Creating Class Sections...");
  const class9A = await prisma.classSection.create({
    data: {
      schoolId: school.id,
      gradeLevel: 9,
      sectionName: "A",
      roomNumber: "Academic Block B, Room 204",
      academicYear: "2026-2027",
    },
  });

  const class9B = await prisma.classSection.create({
    data: {
      schoolId: school.id,
      gradeLevel: 9,
      sectionName: "B",
      roomNumber: "Academic Block B, Room 205",
      academicYear: "2026-2027",
    },
  });

  // 7. Student (Ananya Sharma)
  const studentUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "student@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Ananya Sharma",
      role: "STUDENT",
      phone: "+91 98806 12345",
      languagePref: "en",
    },
  });

  const parentProfile = await prisma.parentProfile.findUnique({
    where: { userId: parentUser.id },
  });

  const studentProfileAnanya = await prisma.studentProfile.create({
    data: {
      userId: studentUser.id,
      admissionNumber: "AIA-2024-0891",
      rollNumber: "9A-04",
      dateOfBirth: new Date("2011-05-18"),
      gender: "Female",
      bloodGroup: "O+",
      classSectionId: class9A.id,
      guardianId: parentProfile?.id,
      busRouteId: busRoute4.id,
      busStopId: busRoute4.stops[1].id, // HSR Layout stop
      holisticGrowthIndex: 91.5,
    },
  });

  // Create Peers in 9-A for realistic multi-student views & MTSS testing
  const rahulUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "rahul.nair@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Rahul Nair",
      role: "STUDENT",
      languagePref: "en",
    },
  });

  const studentProfileRahul = await prisma.studentProfile.create({
    data: {
      userId: rahulUser.id,
      admissionNumber: "AIA-2024-0902",
      rollNumber: "9A-12",
      dateOfBirth: new Date("2011-08-22"),
      gender: "Male",
      bloodGroup: "B+",
      classSectionId: class9A.id,
      busRouteId: busRoute4.id,
      busStopId: busRoute4.stops[2].id,
      holisticGrowthIndex: 68.2, // At-risk score for MTSS demonstration
    },
  });

  const tanviUser = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "tanvi.rao@aetheris.edu",
      passwordHash: defaultPassword,
      name: "Tanvi Rao",
      role: "STUDENT",
      languagePref: "en",
    },
  });

  const studentProfileTanvi = await prisma.studentProfile.create({
    data: {
      userId: tanviUser.id,
      admissionNumber: "AIA-2024-0915",
      rollNumber: "9A-18",
      dateOfBirth: new Date("2011-02-11"),
      gender: "Female",
      bloodGroup: "A+",
      classSectionId: class9A.id,
      holisticGrowthIndex: 84.0,
    },
  });

  console.log("📚 Seeding Curriculum Units for Socratic Tutor Grounding...");
  await prisma.curriculumUnit.createMany({
    data: [
      {
        subject: "Mathematics",
        gradeLevel: 9,
        chapter: 4,
        title: "Linear Equations in Two Variables & Quadratic Foundations",
        summary: "Standard forms of linear equations ax + by + c = 0, graphical representations, solutions on coordinate planes, and introduction to quadratic factoring.",
        keyConcepts: JSON.stringify(["Coefficients", "Intercepts", "Standard Form", "Factoring by Splitting the Middle Term", "Discriminant"]),
        contentBody: `A linear equation in two variables is an equation of the form ax + by + c = 0 where a, b, c are real numbers and a, b are not both zero.
Geometrically, every solution (x, y) of this equation corresponds to a point on the line representing the equation on the Cartesian coordinate plane.
When factoring quadratic equations ax^2 + bx + c = 0, we seek two numbers p and q such that p + q = b and p * q = a * c.
Important note: The Socratic tutor must guide students to identify 'a', 'b', and 'c' before proposing factoring pairs, never writing the final solution directly.`,
      },
      {
        subject: "Mathematics",
        gradeLevel: 9,
        chapter: 5,
        title: "Introduction to Coordinate Geometry",
        summary: "Cartesian plane, abscissa, ordinate, quadrants, and plotting ordered pairs.",
        keyConcepts: JSON.stringify(["Origin", "X-Axis", "Y-Axis", "Quadrants", "Ordered Pairs"]),
        contentBody: `The plane is called the Cartesian plane, or coordinate plane. The horizontal line is called the x-axis, and the vertical line is the y-axis.
The intersection of these two axes is the origin (0, 0).
The distance of a point from the y-axis is called its x-coordinate, or abscissa. The distance of a point from the x-axis is its y-coordinate, or ordinate.`,
      },
      {
        subject: "Science (Physics)",
        gradeLevel: 9,
        chapter: 8,
        title: "Motion & Newton's Laws",
        summary: "Distance vs displacement, speed vs velocity, uniform acceleration, Newton's three laws of motion.",
        keyConcepts: JSON.stringify(["Displacement", "Acceleration", "First Law (Inertia)", "Second Law (F=ma)", "Third Law"]),
        contentBody: `An object is said to be in uniform motion when it covers equal distances in equal intervals of time.
Newton's First Law states that every object will remain at rest or in uniform motion in a straight line unless compelled to change its state by an external force.
Newton's Second Law defines force: Force is directly proportional to the rate of change of momentum (F = m * a).`,
      },
    ],
  });

  console.log("🗓️ Creating Timetable Slots for Class 9-A...");
  const teacherStaff = await prisma.staffProfile.findUnique({ where: { userId: teacherUser.id } });
  const scienceStaff = await prisma.staffProfile.findUnique({ where: { userId: scienceTeacher.id } });
  const math2Staff = await prisma.staffProfile.findUnique({ where: { userId: mathTeacher2.id } });

  if (teacherStaff && scienceStaff && math2Staff) {
    // Monday schedule (Day 1)
    await prisma.timetableSlot.createMany({
      data: [
        { classSectionId: class9A.id, staffId: teacherStaff.id, subject: "Mathematics", dayOfWeek: 1, periodNumber: 1, startTime: "08:30", endTime: "09:15" },
        { classSectionId: class9A.id, staffId: scienceStaff.id, subject: "Physics", dayOfWeek: 1, periodNumber: 2, startTime: "09:20", endTime: "10:05" },
        { classSectionId: class9A.id, staffId: math2Staff.id, subject: "Statistics Lab", dayOfWeek: 1, periodNumber: 3, startTime: "10:25", endTime: "11:10" },
        { classSectionId: class9A.id, staffId: teacherStaff.id, subject: "Mathematics", dayOfWeek: 2, periodNumber: 2, startTime: "09:20", endTime: "10:05" },
        { classSectionId: class9A.id, staffId: scienceStaff.id, subject: "Physics Lab", dayOfWeek: 2, periodNumber: 4, startTime: "11:15", endTime: "12:00" },
        { classSectionId: class9B.id, staffId: teacherStaff.id, subject: "Mathematics", dayOfWeek: 1, periodNumber: 4, startTime: "11:15", endTime: "12:00" },
      ],
    });
  }

  console.log("📝 Creating Exams & Realistic Grade Records...");
  const midtermMath = await prisma.exam.create({
    data: {
      classSectionId: class9A.id,
      title: "Mid-Term Examination (Semester 1)",
      subject: "Mathematics",
      maxMarks: 100,
      date: new Date("2026-10-15"),
      term: "Term 1",
    },
  });

  const unitTestPhysics = await prisma.exam.create({
    data: {
      classSectionId: class9A.id,
      title: "Unit Test 2: Kinematics & Laws of Motion",
      subject: "Physics",
      maxMarks: 50,
      date: new Date("2026-11-05"),
      term: "Term 1",
    },
  });

  await prisma.gradeRecord.createMany({
    data: [
      {
        examId: midtermMath.id,
        studentId: studentProfileAnanya.id,
        marksObtained: 94.0,
        letterGrade: "A+",
        teacherRemarks: "Exemplary understanding of algebraic expressions and logical derivations.",
        aiRemarkDraft: "Ananya demonstrates top-tier mastery in algebraic problem solving and shows consistent resilience.",
      },
      {
        examId: midtermMath.id,
        studentId: studentProfileRahul.id,
        marksObtained: 58.0,
        letterGrade: "C",
        teacherRemarks: "Struggling with quadratic middle-term factorization. Needs remedial practice.",
        aiRemarkDraft: "Rahul shows foundational grasp of single-variable equations but decelerates on multi-step polynomials.",
      },
      {
        examId: midtermMath.id,
        studentId: studentProfileTanvi.id,
        marksObtained: 86.0,
        letterGrade: "A",
        teacherRemarks: "Strong conceptual accuracy; double-check calculation steps under time constraints.",
      },
      {
        examId: unitTestPhysics.id,
        studentId: studentProfileAnanya.id,
        marksObtained: 47.0,
        letterGrade: "A+",
        teacherRemarks: "Outstanding grasp of Newton's laws.",
      },
    ],
  });

  console.log("🚨 Seeding OmniLoop MTSS Early-Warning Flags & Interventions...");
  // Rahul has a Tier 2 Academic Flag
  const rahulFlag = await prisma.mTSSFlag.create({
    data: {
      studentId: studentProfileRahul.id,
      severity: "TIER_2_MODERATE",
      domain: "ACADEMIC",
      triggerReason: "Formative deceleration: Math score dropped by 24% over past 3 assessments; missed 2 homework submissions.",
      status: "ACTIVE",
      recommendedAction: "Deploy Socratic Remedial Module on Chapter 4 Polynomials + 15 min 1:1 teacher concept check.",
      encryptedNotes: encrypt("Confidential Counselor Note: Student reported temporary anxiety during timed tests due to family relocation. Receptive to guided practice."),
    },
  });

  if (teacherStaff) {
    await prisma.mTSSIntervention.create({
      data: {
        flagId: rahulFlag.id,
        assignedToStaffId: teacherStaff.id,
        strategy: "Assign Socratic Module 'Factoring Quadratic Equations' with progressive hint scaffolding.",
        progressNotes: "Initial check-in completed. Rahul showed improvement on factoring standard forms (a=1).",
        outcomeStatus: "IN_PROGRESS",
      },
    });
  }

  // Ananya has positive growth log
  await prisma.sELMoodLog.create({
    data: {
      studentId: studentProfileAnanya.id,
      date: "2026-11-24",
      moodScore: 5,
      energyLevel: 3,
      note: "Excited for the science exhibition and feeling confident in math!",
    },
  });

  console.log("💰 Creating Fee Invoices...");
  await prisma.feeInvoice.create({
    data: {
      studentId: studentProfileAnanya.id,
      invoiceNumber: "INV-2026-Q3-0891",
      totalAmount: 32500.0,
      paidAmount: 32500.0,
      dueDate: new Date("2026-11-30"),
      status: "PAID",
      breakdown: JSON.stringify([
        { title: "Term 2 Tuition Fee", amount: 22000 },
        { title: "Lab & Technology Access", amount: 4500 },
        { title: "Transport Fee (Route 04)", amount: 6000 },
      ]),
    },
  });

  await prisma.feeInvoice.create({
    data: {
      studentId: studentProfileRahul.id,
      invoiceNumber: "INV-2026-Q3-0902",
      totalAmount: 26500.0,
      paidAmount: 13250.0,
      dueDate: new Date("2026-12-15"),
      status: "INSTALLMENT_REQUESTED",
      breakdown: JSON.stringify([
        { title: "Term 2 Tuition Fee", amount: 22000 },
        { title: "Lab Access", amount: 4500 },
      ]),
      installmentNote: "Parent requested 2-part split installment due to December medical expense. 50% paid, second installment scheduled Dec 15.",
    },
  });

  console.log("📢 Creating Trilingual Notices...");
  await prisma.notice.create({
    data: {
      schoolId: school.id,
      title: "Annual STEM & Innovation Showcase 2026",
      content: "We are thrilled to announce our Annual STEM & Innovation Showcase on Friday, December 4th. All parents and students are invited to witness student engineering projects.",
      translations: JSON.stringify({
        en: "We are thrilled to announce our Annual STEM & Innovation Showcase on Friday, December 4th. All parents and students are invited to witness student engineering projects.",
        hi: "हमें शुक्रवार, 4 दिसंबर को अपने वार्षिक एसटीईएम और नवाचार प्रदर्शनी की घोषणा करते हुए खुशी हो रही है। सभी अभिभावकों और छात्रों को छात्र इंजीनियरिंग परियोजनाओं को देखने के लिए आमंत्रित किया जाता है।",
        kn: "ಡಿಸೆಂಬರ್ 4 ರ ಶುಕ್ರವಾರದಂದು ನಮ್ಮ ವಾರ್ಷಿಕ STEM ಮತ್ತು ಆವಿಷ್ಕಾರ ಪ್ರದರ್ಶನವನ್ನು ಪ್ರಕಟಿಸಲು ನಾವು ಸಂತೋಷಪಡುತ್ತೇವೆ. ವಿದ್ಯಾರ್ಥಿ ಎಂಜಿನಿಯರಿಂಗ್ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಎಲ್ಲಾ ಪೋಷಕರು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಆಹ್ವಾನಿಸಲಾಗಿದೆ.",
      }),
      category: "ACADEMIC",
      authorName: "Dr. Sunita Kulkarni (Principal)",
    },
  });

  console.log("🚌 Recording SafeRide Bus Boarding Telemetry...");
  await prisma.busAttendance.create({
    data: {
      date: "2026-11-24",
      busRouteId: busRoute4.id,
      studentId: studentProfileAnanya.id,
      tripType: "MORNING_PICKUP",
      boardedAt: new Date(Date.now() - 3600000), // 1 hour ago
      verifiedBy: "ATTENDANT_SCAN",
    },
  });

  console.log("📜 Logging Initial Sensitive Audit Trail...");
  await prisma.auditLog.create({
    data: {
      userId: principalUser.id,
      action: "SENSITIVE_RECORD_READ",
      entityType: "MTSS_FLAG",
      entityId: rahulFlag.id,
      metadata: JSON.stringify({ reason: "Principal weekly pastoral review", accessRole: "PRINCIPAL" }),
      ipAddress: "127.0.0.1",
    },
  });

  console.log("✅ Seed completed successfully with full institutional dataset!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
