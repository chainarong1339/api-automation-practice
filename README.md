# API Automation Testing — Notes API

[![API Tests](https://github.com/chainarong1339/api-automation-practice/actions/workflows/test.yml/badge.svg)](https://github.com/chainarong1339/api-automation-practice/actions/workflows/test.yml)

Automated API test suite สำหรับ Notes API ด้วย **Jest + supertest (TypeScript)**
รันอัตโนมัติทุก push ผ่าน GitHub Actions

## Tech Stack
- **Jest** — test runner
- **supertest** — HTTP assertions
- **TypeScript** (ts-jest)
- **GitHub Actions** — CI

## Test Coverage
- ✅ **CRUD**: สร้าง / อ่าน / แก้ไข / ลบ note (POST, GET, PUT, DELETE)
- ✅ **Auth**: login ครั้งเดียวด้วย `beforeAll`, ส่ง token ผ่าน header
- ✅ **Negative cases**: ไม่ส่ง token (401), category ผิด (400)
- ✅ **Data-driven**: ทดสอบหลาย input ด้วย `it.each`
- ✅ **Verify side effects**: ลบแล้วยืนยันว่าหายจริง (GET → 404)

## โครงสร้าง
```
test/
  helpers.ts      # helper ร่วม (createNote, baseURL)
  user.test.ts    # เทส CRUD + auth + negative
```

## วิธีรัน
```bash
npm install
npm test
```

## หมายเหตุ
ทดสอบกับ public practice API: `practice.expandtesting.com/notes/api`
