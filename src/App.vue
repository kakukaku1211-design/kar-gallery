<script setup lang="ts">
import { ref } from 'vue'
import art1 from '@/assets/hawk.png'
import art2 from '@/assets/white-tiger.png'
import art3 from '@/assets/orca.png'
import art4 from '@/assets/cat-kijitora.png'
import art5 from '@/assets/hedgehog.png'
import art6 from '@/assets/red-fox.png'
import art7 from '@/assets/okojo.png'
import art8 from '@/assets/abronia-graminea.png'
import art9 from '@/assets/crocodile.png'
import art10 from '@/assets/snake.png'

type Work = {
  id: number
  title: string
  image: string
}

const works = ref<Work[]>([
  { id: 1, title: '鷹　Hawk', image: art1 },
  { id: 2, title: 'ホワイトタイガー　WhiteTiger', image: art2 },
  { id: 3, title: 'シャチ　Orca', image: art3 },
  { id: 4, title: 'キジトラ　Cat', image: art4 },
  { id: 5, title: 'ハリネズミ　Hedgehog', image: art5 },
  { id: 6, title: 'レッドフォックス　Red Fox', image: art6 },
  { id: 7, title: 'オコジョ　Okojo', image: art7 },
  { id: 8, title: 'アブロニア　Abronian', image: art8 },
  { id: 9, title: 'ワニ　Crocodile', image: art9 },
  { id: 10, title: 'ヘビ　Snake', image: art10 },
])

const selectedWork = ref<Work | null>(null)
</script>

<template>
  <div class="container">
    <header>
      <h1>Kar Gallery</h1>
      <p>初めまして、Karです。こちらは私の作品展示室です。</p>
    </header>

    <section class="carousel-section">
      <h2>Exhibition</h2>
      <div class="carousel">
        <div class="carousel-track">
          <div 
            v-for="(work, i) in works" 
            :key="work.id" 
            class="carousel-item"
            :style="{'--i': i, '--total': works.length}"
            @click="selectedWork = work"
          >
            <img :src="work.image" :alt="work.title" />
            <p class="caption">{{ work.title }}</p>
          </div>
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
  font-family: "Georgia", serif;
  color: #333;
  background: #f5f5f0;
  min-height: 100vh;
  overflow-x: hidden;
}

header {
  text-align: center;
  padding: 4rem 1rem 2rem;
  border-bottom: 1px solid #ddd;
}

header h1 {
  font-size: 3rem;
  letter-spacing: 2px;
}

header p {
  margin-top: 0.5rem;
  color: #666;
}

.carousel-section {
  margin: 4rem auto;
  text-align: center;
}

.carousel {
  perspective: 1200px;
  width: 100%;
  height: 400px;
  position: relative;
  overflow: visible;
}

.carousel-track {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  animation: rotate 25s linear infinite;
}

.carousel-item {
  position: absolute;
  width: 200px;
  text-align: center;
  transform: rotateY(calc((360deg / var(--total)) * var(--i))) translateZ(500px);
}

.carousel-item img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
}

.caption {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #555;
}

/* モーダル */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  padding: 0;
  border-radius: 8px;
  max-width: 95%;
  max-height: 95%;
  text-align: center;
  position: relative;
}

.modal-content img {
  width: 100%;
  height: auto;
  max-height: 90vh;
  border-radius: 8px;
  object-fit: contain; /* 枠に収める */
  display: block;
  margin: 0 auto;
}

.modal-content h3 {
  margin: 0.5rem 0 1rem;
  color: #333;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
}

@keyframes rotate {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(-360deg); }
}

/* スマホでも横スクロールできる */
@media (pointer: coarse) {
  .carousel {
    overflow-x: auto;
    perspective: none;
  }
  .carousel-track {
    display: flex;
    transform: none !important;
    position: static;
    animation: none;
  }
  .carousel-item {
    position: relative;
    flex: 0 0 auto;
    transform: none !important;
    margin: 0 8px;
  }
}
</style>
