<template>
  <div class="dashboard">
    <Transition name="dashboard__aside-fade">
      <div v-show="isShowSidebar" class="dashboard__aside">
        <div class="dashboard__aside-wrap">
          <div class="dashboard__aside-top">
            <div class="dashboard__search">
              <div class="dashboard__search-title">Поиск документа</div>
              <div class="dashboard__search-inp">
                <el-input @input="debounce" v-model="searchInp" :disabled="isSubmit" clearable
                  placeholder="Введите ID документа" ref="dashboardSearchInp" />
              </div>
            </div>
            <button @click="isShowSidebar = false" class="dashboard__toggle">
              <Icons name="close" />
            </button>
          </div>

          <div class="dashboard__result">
            <div class="dashboard__result-title">Результаты</div>
            <Icons v-if="store.state.loading" name="loader" />
            <template v-else>
              <div v-if="documents && documents.length" class="dashboard__result-items">
                <div v-for="(item, idx) in documents" :key="idx" @click="setMainDoc(item)"
                  class="dashboard__result-item">
                  <div class="dashboard__result-img">
                    <img :src="item.image" :alt="item.name">
                  </div>
                  <div class="dashboard__result-info">
                    <div class="dashboard__result-name">{{ item.name }}</div>
                    <div class="dashboard__result-size">12 MB</div>
                  </div>
                </div>
              </div>
              <div v-else class="dashboard__result-empty">Ничего не найдено</div>
            </template>
          </div>
        </div>
      </div>
    </Transition>
    <div v-show="isShowSidebar" @click="isShowSidebar = false" class="dashboard__aside-overlay"></div>

    <div class="dashboard__aside-flag-wrap">
      <button @click="isShowSidebar = true" class="dashboard__aside-flag">
        <Icons name="bookmark" />
      </button>
    </div>

    <div class="dashboard__main">
      <div v-if="currentDocument" class="dashboard__detail">
        <div class="dashboard__detail-img">
          <picture>
            <source :srcset="currentDocument.image" media="(max-width: 768px)">
            <img :src="currentDocument.image" :alt="'превью' + currentDocument.name">
          </picture>
        </div>

        <div class="dashboard__detail-info">
          <div class="dashboard__detail-title">{{ currentDocument.name }}</div>
          <div class="dashboard__detail-actions">
            <div class="dashboard__detail-action">
              <button @click="downloadPdf" class="btn btn--primary">Скачать</button>
            </div>

            <div class="dashboard__detail-action">
              <button class="btn btn--danger">Удалить</button>
            </div>
          </div>
          <div class="dashboard__detail-description">
            <h6>Описание:</h6>
            <p>{{ currentDocument.description }}</p>
            <p>{{ currentDocument.description }}</p>
            <p>{{ currentDocument.description }}</p>
            <p>{{ currentDocument.description }}</p>
            <p>{{ currentDocument.description }}</p>
          </div>
        </div>
      </div>

      <div v-else class="dashboard__main-help">
        <template v-if="documents && documents.length">Выберите документ, чтобы посмотреть его содержиое</template>
        <template v-else>По результату ничего не найдено</template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStore } from "vuex";
import { key } from "@/store";
import { jsPDF } from "jspdf";
import '../assets/fonts/montserrat/Montserrat-Regular-normal.js'
import Icons from "@/components/Icons.vue";
import { createDebounce } from "@/utils/debounce";
import { DocumentDataInterface } from "@/interfaces/documents.interface";

const store = useStore(key);
const documents = ref<DocumentDataInterface[]>([]);
const currentDocument = ref<DocumentDataInterface | null>(null);
const searchInp = ref<string>('');
const isSubmit = ref(false);
const isShowSidebar = ref(true);
const dashboardSearchInp = ref<HTMLInputElement | null>(null);

onMounted(() => {
  getDociments();
})

async function getDociments(paramName: string | null = null, paramValue: string | null = null) {
  documents.value = await store.dispatch('documents/getDocuments', { paramName, paramValue });
}

function setMainDoc(doc: DocumentDataInterface) {
  currentDocument.value = doc;
}

function downloadPdf() {
  try {
    if (currentDocument.value) {
      const doc = new jsPDF();
      doc.setFontSize(30);
      doc.setFont('Montserrat-Regular');
      doc.text(currentDocument.value.name, 35, 25);
      doc.addImage(currentDocument.value.image, "JPEG", 15, 35, 180, 180);
      doc.setFontSize(10);
      doc.text(currentDocument.value.description, 15, 225, {
        maxWidth: 180
      });
      doc.save(`${currentDocument.value.name}.pdf`);
    }
  } catch (e) {
    store.dispatch('alerts/add', {
      text: 'Файл не удалось скачать =(',
      timeout: 5000,
    })
  }
}

async function searchDoc() {
  isSubmit.value = true;
  await getDociments('search', searchInp.value);
  isSubmit.value = false;
  if (dashboardSearchInp.value) {
    dashboardSearchInp.value.focus();
  }
}

function debounce() {
  createDebounce(searchDoc, 1000);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.dashboard__aside-fade-enter-active {
  transition: all 0.3s ease-out;
}

.dashboard__aside-fade-leave-active {
  transition: all 0.3s ease-in;
}

.dashboard__aside-fade-enter-from,
.dashboard__aside-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}


.dashboard {
  position: relative;
  flex-grow: 1;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border-left: 1px solid var(--color-border-dashboard);

  &__aside {
    flex-shrink: 0;
    width: 280px;
    border-right: 1px solid var(--color-border-dashboard);

    @media (max-width: $media-md) {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: auto;
      border-right: none;
      background: #fff;
      z-index: 2;
    }
  }

  &__aside-wrap {
    position: sticky;
    top: 0;

    @media (max-width: $media-md) {
      width: 300px;
    }

    @media (max-width: $media-sm) {
      width: 290px;
    }
  }

  &__aside-top {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    padding: 27px 20px 0;

    @media (max-width: $media-md) {
      position: relative;
    }
  }

  &__search {
    width: 100%;

    @media (max-width: $media-md) {
      width: 100%;
    }
  }

  &__search-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-title);
  }

  &__search-inp {
    position: relative;
    margin-top: 14px;

    input {
      width: 100%;
      padding: 16px 24px;
      border: 1px solid var(--color-border);
      border-radius: 8px;
    }
  }

  &__toggle {
    display: none;
    background-color: transparent;
    border: none;
    color: var(--color-text-content);

    &:deep(.ico) {
      width: 100%;
      height: 100%;
    }

    @media (max-width: $media-md) {
      position: absolute;
      top: 5px;
      right: 5px;
      display: block;
      width: 20px;
      height: 20px;
      padding: 0;
    }
  }

  &__result {
    margin-top: 30px;

    &:deep(.ico) {
      width: 60px;
      height: 60px;
      margin-top: 20px;
    }
  }

  &__result-title {
    padding: 0 20px;
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-title);
  }

  &__result-empty {
    margin-top: 14px;
    padding: 0 20px;
  }

  &__result-items {
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-height: 730px;
    margin-top: 18px;
    padding: 0 20px 27px;
    overflow-y: auto;

    @media (max-width: $media-md) {
      max-height: 577px;
    }
  }

  &__result-item {
    display: flex;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  &__result-img {
    flex-shrink: 0;
    width: 70px;
    height: 70px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__result-info {
    flex-grow: 1;
    padding: 15px;
    border-left: 1px solid var(--color-border-dashboard);

    .dashboard__result-item--active & {
      color: #fff;
      background-color: var(--color-primary);
      border-left: none;
    }
  }

  &__result-name {
    font-weight: 600;
    color: var(--color-label);

    .dashboard__result-item--active & {
      color: #fff;
    }
  }

  &__result-size {
    text-transform: uppercase;
    margin-top: 6px;
  }

  &__main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 30px;
  }

  &__main-help {
    margin: auto;
  }

  &__detail {
    display: flex;
    align-items: flex-start;
    gap: 60px;

    @media (max-width: $media-xl) {
      flex-direction: column;
      gap: 40px;
    }
  }

  &__detail-img {
    flex-shrink: 0;
    display: flex;
    max-width: 424px;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__detail-info {
    flex-grow: 1;
  }

  &__detail-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-title);
  }

  &__detail-actions {
    display: flex;
    gap: 17px;
    margin-top: 14px;

    @media (max-width: $media-sm) {
      flex-direction: column;

      .btn {
        width: 100%;
      }
    }
  }

  &__detail-description {
    margin-top: 47px;

    h6 {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--color-title);
    }

    p {
      margin-top: 14px;
    }
  }

  &__aside-flag-wrap {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;

    @media (max-width: $media-md) {
      display: block;
    }
  }

  &__aside-flag {
    position: sticky;
    top: 50%;
    display: none;
    transform: rotate(-90deg);
    background-color: transparent;
    border: none;

    @media (max-width: $media-md) {
      display: block;
    }
  }

  &__aside-overlay {
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    background: rgba(7, 7, 7, 0.5);
    width: 100%;
    height: 100%;
    cursor: pointer;

    @media (max-width: $media-md) {
      display: block;
    }
  }
}
</style>