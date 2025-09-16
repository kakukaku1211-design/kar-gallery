<script lang="ts" setup>
import { ref } from 'vue'

type Work = {
  id: number
  title: string
  image: string
}

const works = ref<Work[]>([
  { id: 1, title: '作品タイトル1', image: 'https://placehold.co/600x400' },
  { id: 2, title: '作品タイトル2', image: 'https://placehold.co/600x400' },
  { id: 3, title: '作品タイトル3', image: 'https://placehold.co/600x400' },
])

const selectedWork = ref<Work | null>(null)
</script>

<template>
  <div class="container">
    <header>
      <h1>My Portfolio</h1>
      <p>ここに自己紹介のダミーテキストが入ります。ここに自己紹介のダミーテキストが入ります。</p>
    </header>

    <section class="gallery">
      <h2>Gallery</h2>
      <div class="grid">
        <div 
          v-for="work in works" 
          :key="work.id" 
          class="card"
          @click="selectedWork = work"
        >
          <img :src="work.image" :alt="work.title" />
          <p>{{ work.title }}</p>
        </div>
      </div>
    </section>

    <!-- モーダル -->
    <div class="modal" v-if="selectedWork" @click.self="selectedWork = null">
      <div class="modal-content">
        <span class="close" @click="selectedWork = null">&times;</span>
        <img :src="selectedWork.image" :alt="selectedWork.title" />
        <h3>{{ selectedWork.title }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: "Helvetica Neue", sans-serif;
  color: #333;
  background: #f7f7f7;
  min-height: 100vh;
}
header {
  background: #2f3a4a;
  color: #fff;
  padding: 2rem;
  text-align: center;
}
.gallery {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.02);
}
.card img {
  width: 100%;
  display: block;
}
.card p {
  padding: 0.5rem 1rem;
  font-weight: 500;
}

/* モーダル */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  max-width: 90%;
  max-height: 80%;
  text-align: center;
}
.modal-content img {
  max-width: 100%;
  border-radius: 6px;
}
.close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
}
</style>
