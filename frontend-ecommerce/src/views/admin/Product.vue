<script setup>
import { useProductStore } from "@/stores/productStore";
import { onMounted, reactive, watch, ref } from "vue";
import Button from "@/components/button/Button.vue";
import axios from "axios";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});

const formAddProduct = reactive({
  nama_product: "",
  harga: 0,
  jumlah: 0,
  jenis: "",
  kategori: "",
  color: "",
  slug: "",
});

const formEditProduct = reactive({
  nama_product: "",
  harga: 0,
  jumlah: 0,
  jenis: "",
  kategori: "",
  color: "",
  slug: "",
  image: ""
})
const product_id = ref()

const image = ref([]);

const showModal = ref(false);
const showModalEdit = ref(false);
const showModalDelete = ref(false);
const modalProduct = () => {
  showModal.value = !showModal.value;
};

const modalEditProduct = (product) => {
  formEditProduct.nama_product = product.nama_product
  formEditProduct.harga = product.harga
  formEditProduct.jumlah = product.jumlah
  formEditProduct.jenis = product.jenis
  formEditProduct.kategori = product.kategori
  formEditProduct.color = product.color
  formEditProduct.slug = product.slug
  formEditProduct.image = product.image

  product_id.value = product._id 

  showModalEdit.value = !showModalEdit.value;
};



const modalDeleteProduct = (id) => {
  product_id.value = id
  showModalDelete.value = !showModalDelete.value;
};

const deleteProduct= async() => {
  await productStore.deleteProduct(product_id.value)
  await productStore.fetchProducts();
  showModalDelete.value = false
  
}

const imageUpload = (event) => {
  image.value = Array.from(event.target.files)

  if (image.value.length > 0) {
    formEditProduct.image = ""
  }
}

const addProduct = async () => {
  const formData = new FormData();
  for (const key in formAddProduct) {
    formData.append(key, formAddProduct[key]);
  }

  image.value.forEach((imgFile, index) => {
    formData.append("image[]", imgFile);
  });

  try {
    await axios.post("http://localhost:9887/api/admin/addProduct", formData);
    showModal.value = false;

    await productStore.fetchProducts();
    alert("Product ditambahkan");
  } catch (error) {
    console.error("Gagal menambahkan produk", error);
    alert("Gagal menambahkan produk.");
  }
}

const editProduct = async () => {
  const formData = new FormData();

  // Tambahkan data input text
  for (const key in formEditProduct) {
    if (key !== "image") { // image akan ditambahkan terpisah
      formData.append(key, formEditProduct[key]);
    }
  }

  // Cek apakah user mengupload gambar baru
  if (image.value.length > 0) {
    image.value.forEach((imgFile) => {
      formData.append("image[]", imgFile); // sesuai dengan backend
    });
  }


  formData.append("product_id", product_id.value)
 

  try {
    await axios.patch("http://localhost:9887/api/admin/editProduct", formData);
    showModalEdit.value = false;

    await productStore.fetchProducts();
    alert("Product berhasil diedit")
  } catch (error) {
    console.error("Gagal edit produk", error)
    alert("Gagal mengedit produk.")
  }
}
</script>

<template>
  <div class="header">
    <h1>Daftar Produk</h1>
    <Button @click="modalProduct">Add Product</Button>
  </div>

  <div v-if="showModal" class="modal-wrapper">
    <div class="overlay" @click="showModal = false">
      <div class="modal-box modal-add-product" @click.stop>
        <div class="input">
          <label for="upload-file">Upload Image</label>
          <input id="upload-file" type="file" multiple @change="imageUpload" />
        </div>
        <div class="input">
          <label for="">nama product</label>
          <input type="text" v-model="formAddProduct.nama_product" />
        </div>

        <div class="input">
          <label for="">harga</label>
          <input type="number" v-model="formAddProduct.harga" />
        </div>

        <div class="input">
          <label for="">jenis</label>
          <input type="text" v-model="formAddProduct.jenis" />
        </div>

        <div class="input">
          <label for="">jumlah</label>
          <input type="number" v-model="formAddProduct.jumlah" />
        </div>

        <div class="input">
          <label for="">kategori</label>
          <input type="text" v-model="formAddProduct.kategori" />
        </div>

        <div class="input">
          <label for="">color</label>
          <input type="text" v-model="formAddProduct.color" />
        </div>

        <div class="input">
          <label for="">slug</label>
          <input type="text" v-model="formAddProduct.slug" />
        </div>

        <Button @click="addProduct">Add</Button>
      </div>
    </div>
  </div>

  <div v-if="showModalEdit" class="modal-edit-wrapper">
    <div class="overlay" @click="showModalEdit = false">
      <div class="modal-box modal-edit-product" @click.stop>
        <div class="input">
          <img
            :src="`http://localhost:9887/${formEditProduct.image}`"
            alt="Gambar"
            class="img-produk"
          />
          <label for="upload-file">Upload Image</label>
          <input id="upload-file" type="file" multiple @change="imageUpload" />
        </div>
        <div class="input">
          <label for="">nama product</label>
          <input type="text" v-model="formEditProduct.nama_product" />
        </div>

        <div class="input">
          <label for="">harga</label>
          <input type="number" v-model="formEditProduct.harga" />
        </div>

        <div class="input">
          <label for="">jenis</label>
          <input type="text" v-model="formEditProduct.jenis" />
        </div>

        <div class="input">
          <label for="">jumlah</label>
          <input type="number" v-model="formEditProduct.jumlah" />
        </div>

        <div class="input">
          <label for="">kategori</label>
          <input type="text" v-model="formEditProduct.kategori" />
        </div>

        <div class="input">
          <label for="">color</label>
          <input type="text" v-model="formEditProduct.color" />
        </div>

        <div class="input">
          <label for="">slug</label>
          <input type="text" v-model="formEditProduct.slug" />
        </div>

        <Button @click="editProduct">Edit</Button>
      </div>
    </div>
  </div>

  <div v-if="showModalDelete" class="modal-edit-wrapper">
    <div class="overlay" @click="showModalDelete = false">
      <div class="modal-box modal-delete-product" @click.stop>
        <p>Apakah yakin akan menghapus produk?</p>
        <div class="button-detele-wrapper">
          <Button @click="showModalDelete = false">Batal</Button>
          <Button @click="deleteProduct">Hapus</Button>
        </div>
      </div>
    </div>
  </div>

  <table class="produk-table">
    <thead>
      <tr>
        <th>Gambar</th>
        <th>Nama</th>
        <th>Harga</th>
        <th>Jumlah</th>
        <th>Jenis</th>
        <th>Kategori</th>
        <th>Warna</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in productStore.productData" :key="product._id">
        <td>
          <img
            :src="`http://localhost:9887/${product.image}`"
            alt="Gambar"
            class="img-produk"
          />
        </td>
        <td>{{ product.nama_product }}</td>
        <td>Rp{{ product.harga.toLocaleString("id-ID") }}</td>
        <td>{{ product.jumlah }}</td>
        <td>{{ product.jenis }}</td>
        <td>{{ product.kategori }}</td>
        <td>{{ product.color }}</td>
        <td>
          <Button class="btn-edit" @click="modalEditProduct(product)">
            Edit
          </Button>
          <Button class="btn-hapus" @click="modalDeleteProduct(product._id)"
            >Hapus</Button
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Gelap transparan */
  z-index: 1;
}
.modal-box {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 400px;
  /* max-width: 400px; */
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
}

.modal-add-product a {
  display: block;
  text-align: center;
  margin-bottom: 16px;
}

.modal-add-product img {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #f0f0f0;
}

.input {
  margin-bottom: 16px;
}

.input label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.input input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input input:focus {
  border-color: #007bff;
  outline: none;
}

.produk-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.produk-table th,
.produk-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.produk-table th {
  background-color: #f2f2f2;
}

.img-produk {
  width: 60px;
  height: auto;
  object-fit: cover;
}

.btn-edit {
  padding: 4px 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-hapus {
  padding: 4px 8px;
  background-color: #cf3b16;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit:hover {
  background-color: #45a049;
}

.btn-hapus:hover {
  background-color: #9b341a;
}
</style>
