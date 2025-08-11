POST  http://localhost:4000/login/auth
Content-Type: application/json

{
    "email": "test@test",
    "password": "testing"
}

###

POST  http://localhost:4000/users
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTMwODA5NDAsImV4cCI6MTc1MzA4MDk2MH0.rD6sl0LBZ1CQ3I4Njlc4MUoJB2LYcfFBX_xvxnDn_P0
    

###
POST http://localhost:4000/login/refresh
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTMyNTE0MjV9.vvCR580EPWf89s_JmK277E0oF6HjHCVzsjZYAW0VR00


###
POST http://localhost:4000/login/logout
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTMwMjM0MDl9.EeautBagTgESgwvS8Q3o_03KwPPWc7Wg-aMWx09OSdA

###

GET http://localhost:4000/test
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTMwMTg3MTJ9.grtCcNHPH6HV-rck_eH4kLqwSxH75Q3gLC5MogRBH70

###
GET http://localhost:4000/get/userData
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTM2NzMzNjR9.302srU5n7MPVW_sjvkuZjkhTa_updgl91yOEjrR74T8


###
GET http://localhost:4000/getEternalToken
Content-Type: application/json

###
POST http://environment-relief.gl.at.ply.gg:24588/submit
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzOTgyNTMwfQ.hNIOhwDdv8sryGZMCkSX7xPCaWgSjtdtft2ScZi9Cvk

{
    "email": "a@a1",
    "password": "testing",
    "name": "testsss", 
    "phonenumber": "1234567890",
    "role": "admin"
}

###
DELETE http://environment-relief.gl.at.ply.gg:24588/submit/14
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTM3NzQ0MzJ9.fmBLz1-BanAWhyyB0H-a7u5MA5qR18MFu-AFGgOp3YE

###

PATCH http://environment-relief.gl.at.ply.gg:24588/submit/97
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

{
    "email": "admin@admin",
    "name": "prikitiw", 
    "phonenumber": "1234567890",
    "role": "admin"
}

###
GET http://environment-relief.gl.at.ply.gg:24588/testing
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

###

GET http://environment-relief.gl.at.ply.gg:24588/frontpage/97
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

###

POST http://environment-relief.gl.at.ply.gg:24588/frontpage/quickstats/97
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME


[
    {
    "title": "Active Courses",
    "value": "10"
    },
    {
    "title": "Progress",
    "value": "0%"
    },
    {
    "title": "Study Time",
    "value": "10m"
    }    
]

###

POST http://environment-relief.gl.at.ply.gg:24588/frontpage/continuelearnig/97
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

[
    {
      "title": "Python for Beginners",
      "subtitle": "Master the fundamentals",
      "progress": 65,
      "duration": "2h 30m left",
      "icon": "FaCode",
      "color": "#3b82f6"
    }
]

###

POST http://environment-relief.gl.at.ply.gg:24588/frontpage/recentActivity/97
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME


###
[
    {
      "type": "completion",
      "title": "Completed 'Variables and Data Types'",
      "course": "Python for Beginners",
      "time": "2 hours ago",
      "icon": "FaAward",
      "color": "#10b981"
    }
]


###

PATCH  http://environment-relief.gl.at.ply.gg:24588/frontpage/97?path=progress_test
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME


### add course

POST http://environment-relief.gl.at.ply.gg:24588/Course
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME


{
    "title": "testing",
    "description": "testing",
    "icon": "FaCode",
    "color": "#3b82f6",
    "available": false,
    "modules": []
}

### add module

PATCH http://environment-relief.gl.at.ply.gg:24588/Course/modules/30
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

{
    "modules": [
        {
            "moduleTitle": "Pengenalan Pemrograman",
            "lessons": [
                { 
                    "title": "Apa itu Pemrograman?", 
                    "subtitle": "Pengenalan Konsep Dasar",
                    "content": "Mengenal apa itu kode, bagaimana komputer memahaminya, dan mengapa pemrograman adalah skill penting di era digital saat ini. Materi ini dilengkapi dengan latihan compiler, kuis, dan esai.",
                    "tasks": [
                        {
                            "id": "task-compiler-1",
                            "type": "compiler",
                            "prompt": "Gunakan compiler di bawah ini untuk menjalankan kode Python. Coba ubah pesan di dalam print() dan lihat hasilnya!"
                        },
                        {
                            "id": "task-mcq-1",
                            "type": "multiple-choice",
                            "prompt": "Apa fungsi utama dari sebuah compiler?",
                            "options": ["Menulis kode", "Menerjemahkan kode ke bahasa mesin", "Menjalankan program", "Mencari error"],
                            "correctAnswer": "Menerjemahkan kode ke bahasa mesin"
                        },
                        {
                            "id": "task-mcq-2",
                            "type": "multiple-choice",
                            "prompt": "Manakah yang bukan merupakan bahasa pemrograman tingkat tinggi?",
                            "options": ["Python", "Java", "Assembly", "C++"],
                            "correctAnswer": "Assembly"
                            
                        },
                        {
                            "id": "task-essay-1",
                            "type": "essay",
                            "prompt": "Menurut Anda, apa tantangan terbesar yang akan dihadapi oleh seseorang yang baru pertama kali belajar pemrograman? Jelaskan alasan Anda."
                        }
                    ]
                },
                { 
                    "title": "Instalasi Alat", 
                    "subtitle": "Menyiapkan Lingkungan Kerja",
                    "content": "Panduan langkah demi langkah untuk menginstal semua perangkat lunak yang Anda butuhkan, seperti editor kode dan compiler.",
                    "hasCompiler": false
                    
                }
            ]
        },
        {
            "moduleTitle": "Dasar-dasar Python",
            "lessons": [
                { 
                    "title": "Variabel dan Tipe Data", 
                    "subtitle": "Menyimpan dan Mengelola Informasi", 
                    "content": "Belajar cara menyimpan data dalam variabel dan memahami tipe data fundamental seperti string, integer, dan float.", 
                    "tasks": [
                            {
                            "id": "task-mcq-3",
                            "type": "multiple-choice",
                            "prompt": "Tipe data untuk 'Hello World' adalah...",
                            "options": ["int", "float", "str", "bool"],
                            "correctAnswer": "str"
                        }
                    ]
                }
            ]
        }
    ]
}

### add lesson module title

patch http://environment-relief.gl.at.ply.gg:24588/Course/modules/41/add_module_title
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

{
    "moduleTitle": "slekberwr"
}

### delete lesson module

patch http://environment-relief.gl.at.ply.gg:24588/Course/modules/37/delete_module_title
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME


{
    "id":1
}

### add lesson
patch http://environment-relief.gl.at.ply.gg:24588/Course/modules/41/add_lesson
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

{
    "id":1,
    "content": [{
        "Nasi": "Goreng"
    }]
}


### get course

GET http://environment-relief.gl.at.ply.gg:24588/Course
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

### patch course

PATCH http://environment-relief.gl.at.ply.gg:24588/Course/32
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

{
    "title": "testing",
    "description": "testing",
    "icon": "FaCode",
    "color": "#3b82f6",
    "available": true
}

### delete course

DELETE http://environment-relief.gl.at.ply.gg:24588/Course/40
Content-Type: application/json
Authorization: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNzg5MzM5fQ.P5apf5rWH6BZuuxCO6jQSCZXqYb-5zptSXgG_NPJDME

