<!-- src/views/News.vue -->
<template>
    <div class="news">
        <h2 class="text-center mb-4">Latest News</h2>

        <!-- Search input -->
        <input v-model="searchQuery" type="text" class="form-control mb-4"
            placeholder="Search news by title, content, date, or category" />

        <!-- News list -->
        <div class="row">
            <div class="col-md-6 mb-4" v-for="item in paginatedNews" :key="item.title">
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ item.date }} | {{ item.category }}</h6>
                        <p class="card-text">{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination controls -->
        <div class="d-flex justify-content-center mt-4">
            <button class="btn btn-outline-primary me-2" :disabled="currentPage === 1"
                @click="currentPage--">Previous</button>
            <button class="btn btn-outline-primary" :disabled="currentPage === totalPages"
                @click="currentPage++">Next</button>
        </div>
    </div>
</template>

<script>
import newsData from '../assets/news.json'

export default {
    name: 'News',
    data() {
        return {
            newsList: newsData,
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 4
        }
    },
    computed: {
        filteredNews() {
            const query = this.searchQuery.toLowerCase()
            return this.newsList.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.content.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.date.toLowerCase().includes(query)
            )
        },
        paginatedNews() {
            const start = (this.currentPage - 1) * this.itemsPerPage
            return this.filteredNews.slice(start, start + this.itemsPerPage)
        },
        totalPages() {
            return Math.ceil(this.filteredNews.length / this.itemsPerPage)
        }
    }
}
</script>

<style scoped>
.news {
    color: #f2f2f2;
}

/* Glassy news card style */
.card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #e0e0e0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 12px;
}

.card:hover {
    transform: scale(1.02);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

/* Card title and subtitle */
.card-title {
    color: #ffffff;
}

.card-subtitle {
    color: #e2dd35 !important;
}

/* Glassy buttons */
button.btn {
    color: #f0f0f0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 8px;
    padding: 0.5rem 1.25rem;
    transition: all 0.3s ease;
}

button.btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.12);
    color: white;
}

button.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Search input */
input.form-control {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #f2f2f2;
}

input.form-control::placeholder {
    color: #bbb;
}
</style>