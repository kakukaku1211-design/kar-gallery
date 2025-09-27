<template>
  <div class="container">
    <header>
      <h1>Kar Gallery</h1>
      <p>初めまして、Karです。</p>
    </header>

    <section class="carousel-section">
      <h2>Exhibition</h2>
      <div
        class="carousel"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointerleave="handlePointerUp"
      >
        <div class="carousel-track" :style="{ transform: `rotateY(${rotationY}deg)` }">
          <div
            v-for="(work, i) in works"
            :key="work.id"
            class="carousel-item"
            :style="{ '--i': i, '--total': works.length }"
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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

type Work = { id: number; title: string; image: string }

const works = ref<Work[]>([
  { id: 1, title: '鷹　Hawk', image: art1 },
  { id: 2, title: 'ホワイトタイガー　WhiteTiger', image: art2 },
  { id: 3, title: 'シャチ　Orca', image: art3 },
  { id: 4, title: 'キジトラ　Cat', image: art4 },
  { id: 5, title: 'ハリネズミ　Hedgehog', image: art5 },
  { id: 6, title: 'レッドフォックス　Red Fox', image: art6 },
  { id: 7, title: 'オコジョ　Okojo', image: art7 },
  { id: 8, title: 'アブロニア・グラミネア　Abronia Graminea', image: art8 },
  { id: 9, title: 'ワニ　Crocodile', image: art9 },
  { id: 10, title: 'ヘビ　Snake', image: art10 },
])

const selectedWork = ref<Work | null>(null)
const rotationY = ref(0)
let startX = 0
let isDragging = false
let autoRotateId: number

// ドラッグ / スワイプ開始
const handlePointerDown = (e: PointerEvent) => {
  isDragging = true
  startX = e.clientX
  const el = e.currentTarget as HTMLElement | null
  if (el && typeof el.setPointerCapture === 'function') {
    el.setPointerCapture(e.pointerId)
  }
}

// ドラッグ / スワイプ中
const handlePointerMove = (e: PointerEvent) => {
  if (!isDragging) return
  const dx = e.clientX - startX
  rotationY.value += dx * 0.3
  startX = e.clientX
}

// ドラッグ / スワイプ終了
const handlePointerUp = (e: PointerEvent) => {
  isDragging = false
  const el = e.currentTarget as HTMLElement | null
  if (el && typeof el.releasePointerCapture === 'function') {
    el.releasePointerCapture(e.pointerId)
  }
}

// 自動回転
const autoRotate = () => {
  if (!isDragging) rotationY.value -= 0.1
  autoRotateId = requestAnimationFrame(autoRotate)
}

onMounted(() => autoRotate())
onUnmounted(() => cancelAnimationFrame(autoRotateId))
</script>


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
  perspective: 1500px;
  width: 100%;
  height: 500px;
  position: relative;
  overflow: visible;
  cursor: grab;
}

.carousel-track {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
}

.carousel-item {
  position: absolute;
  width: 250px;
  text-align: center;
  transform: rotateY(calc((360deg / var(--total)) * var(--i))) translateZ(600px);
  transition: transform 0.2s;
}

.carousel-item img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
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
  background: rgba(0,0,0,0.85);
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
  max-height: 90%;
  text-align: center;
  position: relative;
}
.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 6px;
  object-fit: contain;
}
.close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2rem;
  color: #666;
  cursor: pointer;
}
</style>
