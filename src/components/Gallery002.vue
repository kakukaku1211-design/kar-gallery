<template>
  <div class="gallery-container">
    <!-- ギャラリータイトル -->
    <h2 class="gallery-title">My Animal Gallery</h2>

    <!-- ギャラリー本体 -->
    <div class="gallery">
      <div
        v-for="work in works"
        :key="work.id"
        class="gallery-item"
        @click="openModal(work)"
      >
        <img :src="work.image" :alt="work.title" />
        <p>{{ work.title }}</p>
      </div>
    </div>

    <!-- モーダル -->
    <div v-if="selectedWork" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <img :src="selectedWork.image" :alt="selectedWork.title" />
        <p>{{ selectedWork.title }}</p>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 画像インポート
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

// 型定義
type Work = { id: number; title: string; image: string }

// データ
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

// モーダルの状態
const selectedWork = ref<Work | null>(null)

const openModal = (work: Work) => {
  selectedWork.value = work
}

const closeModal = () => {
  selectedWork.value = null
}
</script>

<style scoped>
/* コンテナ */
.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* タイトル */
.gallery-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 24px;
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
  letter-spacing: 1px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 8px;
}

/* ギャラリー */
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 横4列 */
  gap: 20px;
}

.gallery-item {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.gallery-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
}

.gallery-item p {
  margin: 10px 0;
  font-weight: 600;
  color: #444;
}

/* モーダル */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  max-width: 80%;
  max-height: 80%;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 8px;
}

.modal-content p {
  margin-top: 12px;
  font-size: 1.2rem;
  font-weight: bold;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #ff5555;
}

/* フェードインアニメーション */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>
