import request from "supertest"
import app from "../app.js"
import mongoose from "mongoose"
import Cart from "../models/Cart.js"
import dotenv from "dotenv"


dotenv.config()

let token = ""
let user_id = ""
let product_id = "67cda45c06b5e8ba40a537be"

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)

  // Lakukan login untuk mendapatkan token
  const loginRes = await request(app)
    .post("/api/user/login")
    .send({ email: "admin777@gmail.com", password: "admin777" }) // Ganti sesuai akun test kamu

    // console.log("Login response:", loginRes.body)

  token = loginRes.body.token
  user_id = loginRes.body.user.id // Jika response menyertakan user, simpan user_id juga
})

afterAll(async () => {
  await mongoose.disconnect()
})

// test("cart", async()=>{
//     const res = await request(app)
//       .get("/api/cart")
//       .set("Authorization", `Bearer ${token}`)

//     expect(res.statusCode).toBe(200)
//     expect(Array.isArray(res.body)).toBe(true)
// })

describe("GET /api/cart", () => {
    it("should get cart", async () => {
      const res = await request(app)
        .get("/api/cart")
        // .set("Authorization", `Bearer ${token}`)
  
      expect(res.statusCode).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
    })

  
})

describe("Get /api/cart/user/:user_id", () => {
    it("should get cart by user", async () => {
        const res = await request(app).get(`/api/cart/user/${user_id}`)
        

        expect(res.statusCode).toBe(200)
        expect(res.body[0].user_id).toBe(user_id)
        
    })
})

describe("PUT /api/cart/addProductToCart", () => {
    it("should add cart", async () => {
        const res = await request(app).put('/api/cart/addProductToCart')
         .send({ product_id })
         .set("Authorization", `Bearer ${token}`)

         expect(res.statusCode).toBe(200)
    })
    it("should give warning about authorization", async () => {
        const res = await request(app).put('/api/cart/addProductToCart')
        expect(res.statusCode).toBe(401)
    })
})

describe("POST /api/cart/decrease", () => {
    it("should decrease cart", async () => {
        const res = await request(app).post('/api/cart/decrease')
         .send({product_id})
         .set("Authorization", `Bearer ${token}`)

         expect(res.statusCode).toBe(200)
    })

    
})

// describe("POST /api/cart/decrease", () => {
//     it("should decrease cart",)
// })

// describe("Cart Controller", () => {
//   it("GET /api/cart - ambil semua cart", async () => {
//     const res = await request(app)
//       .get("/api/cart")
//       .set("Authorization", `Bearer ${token}`)

//     expect(res.statusCode).toBe(200)
//     expect(Array.isArray(res.body)).toBe(true)
//   })

//   it("GET /api/cart/user/:user_id - ambil cart berdasarkan user", async () => {
//     const res = await request(app)
//       .get(`/api/cart/user/${user_id}`)
//       .set("Authorization", `Bearer ${token}`)

//     expect(res.statusCode).toBe(200)
//     expect(Array.isArray(res.body)).toBe(true)
//   })

//   it("POST /api/cart - tambah produk ke cart", async () => {
//     const res = await request(app)
//       .post("/api/cart")
//       .send({ product_id })
//       .set("Authorization", `Bearer ${token}`)

//     expect([200, 201]).toContain(res.statusCode)
//     expect(res.body).toHaveProperty("items")
//   })

//   it("PUT /api/cart/decrease - kurangi produk di cart", async () => {
//     const res = await request(app)
//       .put("/api/cart/decrease")
//       .send({ product_id })
//       .set("Authorization", `Bearer ${token}`)

//     expect(res.statusCode).toBe(200)
//     expect(res.body).toHaveProperty("items")
//   })

//   it("DELETE /api/cart - hapus produk dari cart", async () => {
//     const res = await request(app)
//       .delete("/api/cart")
//       .send({ product_id })
//       .set("Authorization", `Bearer ${token}`)

//     expect(res.statusCode).toBe(200)
//     expect(res.body).toHaveProperty("items")
//   })
// })
