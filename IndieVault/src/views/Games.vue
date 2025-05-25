<template>
    <div class="games">
        <h2 class="text-center mb-4">Discover Indie Games</h2>

        <!-- Filter Section -->
        <div class="filter-wrapper d-flex flex-wrap justify-content-center align-items-center gap-3 mb-5">
            <label for="searchInput" class="visually-hidden">Search games</label>
            <input type="text" v-model="searchQuery" class="custom-filter-input"
                placeholder="Search by title or description" aria-label="Search games by title or description" />
            <label for="genreSelect" class="visually-hidden">Filter by genre</label>
            <select v-model="selectedGenre" class="custom-filter-select" aria-label="Filter games by genre">
                <option value="">All Genres</option>
                <option v-for="genre in uniqueGenres" :key="genre" :value="genre">{{ genre }}</option>
            </select>
        </div>

        <div class="mb-4 text-end" v-if="isAdmin">
            <button class="btn btn-outline-light" @click="showAddForm = !showAddForm">
                {{ showAddForm ? 'Cancel' : '➕ Add New Game' }}
            </button>
        </div>

        <!-- Admin-only game creation form -->
        <div class="glass-card game-form p-4 mb-4" v-if="isAdmin && showAddForm">
            <h4 class="mb-3">Add New Game</h4>
            <form @submit.prevent="addGame">
                <div class="mb-2">
                    <label class="form-label" for="newGameTitle">Title</label>
                    <input id="newGameTitle" v-model="newGame.title" class="form-control"
                        :class="{ 'is-invalid': validationErrors.title }" />
                    <div class="invalid-feedback">Title is required.</div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Description</label>
                    <textarea v-model="newGame.description" class="form-control"
                        :class="{ 'is-invalid': validationErrors.description }"></textarea>
                    <div class="invalid-feedback">Description is required.</div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Genre</label>
                    <input v-model="newGame.genre" class="form-control"
                        :class="{ 'is-invalid': validationErrors.genre }" />
                    <div class="invalid-feedback">Genre is required.</div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Cover Image Filename (e.g., game.png)</label>
                    <input v-model="newGame.cover" class="form-control"
                        :class="{ 'is-invalid': validationErrors.cover }" />
                    <div class="invalid-feedback">Cover filename is required.</div>
                </div>
                <button class="btn btn-success mt-2" type="submit">Add Game</button>
            </form>
        </div>

        <!-- Game grid -->
        <draggable v-model="games" tag="div" class="row" item-key="id" @start="onStart" @end="onEnd">
            <template #item="{ element: game }">
                <div class="col-md-4 mb-4" :key="game.id">
                    <div class="card h-100 glass-card">
                        <img :src="getCover(game.cover)" class="card-img-top" :alt="game.title" />

                        <div class="card-body">
                            <h5 class="card-title">{{ game.title }}</h5>
                            <p class="card-text">{{ game.description }}</p>

                            <!-- Like + Wishlist Buttons -->
                            <button class="btn btn-sm" :class="auth.state.currentUser
                                ? (hasLiked(game.id) ? 'btn-danger' : 'btn-outline-light')
                                : 'btn-outline-light disabled'" @click="auth.state.currentUser && toggleLike(game)"
                                :arialabel="hasLiked(game.id) ? `Unlike ${game.title}` : `Like ${game.title}`"
                                :aria-disabled="!auth.state.currentUser">
                                {{ auth.state.currentUser && hasLiked(game.id) ? '❤️' : '🤍' }}
                                {{ game.likes }}
                            </button>
                            <div v-if="!auth.state.currentUser" class="login-prompt small">
                                Login to like
                            </div>
                            <div v-if="auth.state.currentUser" class="mt-2">
                                <button class="btn btn-sm"
                                    :class="wishlistedIds.includes(game.id) ? 'btn-success' : 'btn-outline-success'"
                                    @click="toggleWishlist(game)">
                                    {{ wishlistedIds.includes(game.id) ? 'Wishlisted' : 'Wishlist' }}
                                </button>
                            </div>
                            <!-- Admin controls -->
                            <div class="mt-3" v-if="isAdmin">
                                <div v-if="currentlyEditing && currentlyEditing.id === game.id">
                                    <!-- Editable fields -->
                                    <input v-model="currentlyEditing.title" class="form-control mb-2" />
                                    <textarea v-model="currentlyEditing.description" class="form-control mb-2"
                                        rows="2"></textarea>
                                    <select v-model="currentlyEditing.genre" class="form-select mb-2">
                                        <option v-for="genre in uniqueGenres" :key="genre" :value="genre">{{ genre }}
                                        </option>
                                    </select>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-sm btn-success me-2" @click="saveEdit">Save</button>
                                        <button class="btn btn-sm btn-secondary" @click="cancelEdit">Cancel</button>
                                    </div>
                                </div>

                                <div v-else>
                                    <button class="btn btn-sm btn-warning me-2" @click="editGame(game)">Edit</button>
                                    <button class="btn btn-sm btn-danger" @click="deleteGame(game)">Delete</button>
                                </div>
                            </div>
                            <!-- Reviews -->
                            <div class="mt-4">
                                <h6>Reviews</h6>

                                <div v-if="Array.isArray(reviews[game.id]) && reviews[game.id].length">
                                    <div class="mb-3" v-for="(review, idx) in reviews[game.id]" :key="idx">
                                        <div class="d-flex justify-content-between align-items-center mb-1">
                                            <span class="review-author">{{ review.name }}</span>
                                            <span class="review-date">{{ review.date }}</span>
                                        </div>
                                        <div class="review-text">{{ review.content }}</div>
                                        <hr class="my-2" />
                                    </div>
                                </div>
                                <div v-else class="no-reviews-text small">No reviews yet.</div>

                                <!-- Button to toggle input -->
                                <div class="mt-2" v-if="auth.state.currentUser">
                                    <button class="btn btn-sm btn-outline-primary" @click="toggleReviewInput(game.id)"
                                        :aria-label="reviewInputVisibleMap[game.id] ? 'Cancel writing a review' : 'Write a review'">
                                        {{ reviewInputVisibleMap[game.id] ? 'Cancel' : 'Write a Review' }}
                                    </button>

                                    <!-- Review input -->
                                    <div v-if="reviewInputVisibleMap[game.id]" class="mt-2">
                                        <textarea v-model="newReviewTextMap[game.id]" class="form-control mb-2" rows="2"
                                            :aria-label="`Write a review for ${game.title}`"
                                            placeholder="Write your review..."></textarea>
                                        <button class="btn btn-sm btn-primary"
                                            @click="submitReview(game.id)">Submit</button>
                                    </div>
                                </div>
                                <div v-else class="login-prompt small">Login to add a review.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script>
import fallbackGames from '../assets/games.json'
import auth from '../store/auth'
import draggable from 'vuedraggable'
import { useDebounce } from '../composables/useDebounce';
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useDragReorder } from '../composables/useDragReorder'

export default {
    name: 'Games',
    components: { draggable },
    setup() {
        const storageKey = 'gameList'

        // Try to load from localStorage (must be an array)
        let initial = []
        try {
            const raw = localStorage.getItem(storageKey)
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) initial = parsed
            }
        } catch { }  // ignore parse errors

        // If nothing in storage, use fallbackGames
        const games = ref(
            initial.length
                ? initial
                : fallbackGames.map(g => ({ ...g }))
        )

        watch(games, (updated) => {
            localStorage.setItem(storageKey, JSON.stringify(updated))
        }, { deep: true })

        const searchQuery = ref('')
        const selectedGenre = ref('')
        const currentlyEditing = ref(null)
        const reviews = reactive(JSON.parse(localStorage.getItem('gameReviews')) || {})
        const newReviewText = ref('')
        const newReviewTextMap = reactive({})
        const reviewInputVisibleMap = reactive({})
        const activeReviewGameId = ref(null)
        const showAddForm = ref(false)
        const showToast = ref(false)
        const toastMessage = ref('')
        const debouncedSearch = useDebounce(searchQuery, 500);
        const { isDragging, onStart, onEnd } = useDragReorder(games)

        // List of unique genres from games
        const uniqueGenres = computed(() => {
            return [...new Set(games.value.map(g => g.genre))]
        })

        // Computed filtered games
        const filteredGames = computed(() => {
            const q = debouncedSearch.value.toLowerCase();

            return games.value.filter(game => {
                const matchesSearch =
                    game.title.toLowerCase().includes(q) ||
                    game.description.toLowerCase().includes(q);

                const matchesGenre = selectedGenre.value
                    ? game.genre === selectedGenre.value
                    : true;

                return matchesSearch && matchesGenre;
            });
        });

        const getCover = (filename) => {
            try {
                return new URL(`../assets/${filename}`, import.meta.url).href
            } catch {
                return ''
            }
        }

        const currentPage = ref(1)
        const itemsPerPage = 6

        const paginatedGames = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage
            return filteredGames.value.slice(start, start + itemsPerPage)
        })

        const totalPages = computed(() =>
            Math.ceil(filteredGames.value.length / itemsPerPage)
        )

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++
        }

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--
        }

        const isAdmin = computed(() => auth.state.currentUser?.role === 'admin')

        const deleteGame = (game) => {
            const index = games.value.findIndex(g => g.id === game.id)
            if (index !== -1) {
                games.value.splice(index, 1)
                localStorage.setItem('gameList', JSON.stringify(games.value))
            }
            toastMessage.value = 'Game deleted successfully'
            showToast.value = true
            setTimeout(() => (showToast.value = false), 3000)
        }

        const editGame = (game) => {
            currentlyEditing.value = { ...game }
        }

        const saveEdit = () => {
            const index = games.value.findIndex(g => g.id === currentlyEditing.value.id)
            if (index !== -1) {
                games.value.splice(index, 1, { ...currentlyEditing.value })
            }
            currentlyEditing.value = null
            toastMessage.value = 'Game updated successfully'
            showToast.value = true
            setTimeout(() => (showToast.value = false), 3000)
        }

        const cancelEdit = () => {
            currentlyEditing.value = null
        }

        const newGame = reactive({
            title: '',
            description: '',
            genre: '',
            cover: ''
        })

        const validationErrors = reactive({
            title: false,
            description: false,
            genre: false,
            cover: false
        })

        const addGame = () => {
            // Reset validation errors
            validationErrors.title = !newGame.title.trim()
            validationErrors.description = !newGame.description.trim()
            validationErrors.genre = !newGame.genre.trim()
            validationErrors.cover = !newGame.cover.trim()

            // If any field is invalid, abort
            if (Object.values(validationErrors).some(val => val)) {
                return
            }

            // Create new game object
            const newId = Math.max(...games.value.map(g => g.id)) + 1
            const gameToAdd = {
                id: newId,
                title: newGame.title.trim(),
                description: newGame.description.trim(),
                genre: newGame.genre.trim(),
                cover: newGame.cover.trim(),
                likes: 0,
                wishlisted: false
            }

            // Add to list and persist
            games.value.push(gameToAdd)
            localStorage.setItem('gameList', JSON.stringify(games.value))

            // Reset form and close panel
            newGame.title = ''
            newGame.description = ''
            newGame.genre = ''
            newGame.cover = ''
            showAddForm.value = false

            // Show toast notification
            toastMessage.value = 'New game successfully added'
            showToast.value = true
            setTimeout(() => {
                showToast.value = false
            }, 3000)
        }

        const submitReview = (gameId) => {
            const text = newReviewTextMap[gameId]?.trim()
            if (!text || !auth.state.currentUser) return

            const review = {
                name: auth.state.currentUser.name,
                content: text,
                date: new Date().toLocaleDateString()
            }

            // Ensure reactivity by creating a shallow clone
            const updatedReviews = { ...reviews }

            if (!updatedReviews[gameId]) {
                updatedReviews[gameId] = []
            }

            updatedReviews[gameId].push(review)

            // Reassign to reactive `reviews`
            Object.assign(reviews, updatedReviews)

            // Persist
            localStorage.setItem('gameReviews', JSON.stringify(updatedReviews))

            // Clear input
            newReviewTextMap[gameId] = ''
            reviewInputVisibleMap[gameId] = false
            activeReviewGameId.value = null

            toastMessage.value = 'Review added successfully'
            showToast.value = true
            setTimeout(() => (showToast.value = false), 3000)
        }

        const toggleReviewInput = (gameId) => {
            reviewInputVisibleMap[gameId] = !reviewInputVisibleMap[gameId]
            if (!newReviewTextMap[gameId]) {
                newReviewTextMap[gameId] = ''
            }
            activeReviewGameId.value = reviewInputVisibleMap[gameId] ? gameId : null
        }

        watch(reviews, () => {
            localStorage.setItem('gameReviews', JSON.stringify({ ...reviews }))
        }, { deep: true })

        const likedGameIds = ref([])
        const likedKey = ref(null)

        const loadLiked = () => {
            const user = auth.state.currentUser?.name
            if (user) {
                likedKey.value = `likedGames_${user}`
                try {
                    likedGameIds.value = JSON.parse(localStorage.getItem(likedKey.value)) || []
                } catch {
                    likedGameIds.value = []
                }
            } else {
                likedKey.value = null
                likedGameIds.value = []
            }
        }

        // load on mount and whenever user changes
        onMounted(loadLiked)
        watch(() => auth.state.currentUser, loadLiked)

        // persist whenever IDs change
        watch(likedGameIds, (ids) => {
            if (likedKey.value) localStorage.setItem(likedKey.value, JSON.stringify(ids))
        }, { deep: true })

        const toggleLike = (game) => {
            if (!auth.state.currentUser) return  // block non-logged-in

            const i = likedGameIds.value.indexOf(game.id)
            if (i > -1) {
                likedGameIds.value.splice(i, 1)
                game.likes--
            } else {
                likedGameIds.value.push(game.id)
                game.likes++
            }

            // persist gameList as before
            localStorage.setItem('gameList', JSON.stringify(games.value))

            // toast
            toastMessage.value = i > -1
                ? 'Like removed'
                : 'Game liked!'
            showToast.value = true
            setTimeout(() => showToast.value = false, 3000)
        }

        const hasLiked = (id) => likedGameIds.value.includes(id)

        const wishlistKey = ref(null)
        const wishlistedIds = ref([])

        const loadWishlist = () => {
            const user = auth.state.currentUser?.name
            if (user) {
                wishlistKey.value = `wishlistGames_${user}`
                try {
                    wishlistedIds.value = JSON.parse(localStorage.getItem(wishlistKey.value)) || []
                } catch {
                    wishlistedIds.value = []
                }
            } else {
                wishlistKey.value = null
                wishlistedIds.value = []
            }
        }

        onMounted(loadWishlist)
        watch(() => auth.state.currentUser, loadWishlist)

        watch(wishlistedIds, ids => {
            if (wishlistKey.value) {
                localStorage.setItem(wishlistKey.value, JSON.stringify(ids))
            }
        }, { deep: true })

        const toggleWishlist = (game) => {
            if (!auth.state.currentUser) return
            const i = wishlistedIds.value.indexOf(game.id)
            if (i > -1) {
                wishlistedIds.value.splice(i, 1)
                toastMessage.value = 'Removed from wishlist'
            } else {
                wishlistedIds.value.push(game.id)
                toastMessage.value = 'Added to wishlist'
            }
            // update your games list if you store wishlisted there:
            game.wishlisted = wishlistedIds.value.includes(game.id)
            localStorage.setItem('gameList', JSON.stringify(games.value))

            showToast.value = true
            setTimeout(() => showToast.value = false, 3000)
        }

        return {
            games,
            getCover,
            searchQuery,
            selectedGenre,
            uniqueGenres,
            filteredGames,
            currentPage,
            itemsPerPage,
            paginatedGames,
            totalPages,
            nextPage,
            prevPage,
            isAdmin,
            deleteGame,
            editGame,
            currentlyEditing,
            saveEdit,
            cancelEdit,
            showAddForm,
            newGame,
            addGame,
            validationErrors,
            submitReview,
            reviews,
            newReviewText,
            auth,
            toggleReviewInput,
            newReviewTextMap,
            reviewInputVisibleMap,
            activeReviewGameId,
            showToast,
            toastMessage,
            toggleLike,
            hasLiked,
            likedGameIds,
            likedKey,
            loadLiked,
            toggleWishlist,
            wishlistedIds,
            wishlistKey,
            loadWishlist,
            isDragging,
            onStart,
            onEnd
        }
    }
}

</script>

<style scoped>
.games {
    color: #f2f2f2;
    padding-top: 2rem;
    padding-bottom: 2rem;
}

/* Card style */
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    border-radius: 12px;
    color: #f2f2f2;
    transition: transform 0.2s ease-in-out;
}

.glass-card:hover {
    transform: scale(1.02);
}

.card-img-top {
    max-height: 200px;
    object-fit: cover;
}

/* Prevent hover pop-out for admin form */
.game-form:hover {
    transform: none !important;
    box-shadow: none !important;
}

/* Review section styling */
.review-author {
    color: #00d1b2;
    font-weight: 600;
    font-size: 0.95rem;
}

.review-date {
    color: #aaa;
    font-size: 0.8rem;
}

.review-text {
    color: #f0f0f0;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
}

.no-reviews-text {
    color: #bbb;
    font-style: italic;
}

.filter-wrapper {
    margin-bottom: 2rem;
    gap: 1rem;
}

.custom-filter-input,
.custom-filter-select {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #f2f2f2;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    backdrop-filter: blur(4px);
    transition: border 0.3s ease, background 0.3s ease;
    width: 100%;
    max-width: 300px;
}

.custom-filter-input::placeholder {
    color: #aaa;
}

.custom-filter-input:focus,
.custom-filter-select:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.08);
}

/* Toast styles */
.custom-toast {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    z-index: 1050;
}

/* Fade transition */
.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.4s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
}

/* Make the login prompt more visible */
.login-prompt {
    color: #f2f2f2;
    font-style: italic;
    opacity: 0.9;
}

.login-prompt {
    color: #f2f2f2;
    font-style: italic;
    opacity: 0.9;
    margin-top: 0.25rem;
}

.visually-hidden {
    position: absolute;
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
}
</style>