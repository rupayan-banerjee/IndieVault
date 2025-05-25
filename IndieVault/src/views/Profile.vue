<template>
    <div class="profile container py-4">
        <!-- User greeting -->
        <h2 class="mb-3">Welcome, {{ user.name }}!</h2>
        <p class="text-muted">Role: {{ user.role }}</p>

        <!-- Wishlist section -->
        <h3 class="mt-4">Your Wishlist</h3>
        <div v-if="wishlistGames.length" class="row">
            <div class="col-md-4 mb-4" v-for="game in wishlistGames" :key="game.id">
                <div class="card h-100 glass-card">
                    <img :src="getCover(game.cover)" :alt="game.title" class="card-img-top rounded" />
                    <div class="card-body">
                        <h5 class="card-title">{{ game.title }}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-muted">You have no games in your wishlist.</div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import auth from '../store/auth'
import fallbackGames from '../assets/games.json'

export default {
    name: 'Profile',
    setup() {
        // Current user
        const user = computed(() => auth.state.currentUser)

        // Load full game list (from localStorage or fallback JSON)
        const storageKey = 'gameList'
        const saved = JSON.parse(localStorage.getItem(storageKey)) || fallbackGames
        const gamesList = ref(saved)

        // Load this user’s wishlist IDs
        const wishlistKey = `wishlistGames_${user.name}`
        const wishIds = JSON.parse(localStorage.getItem(wishlistKey)) || []

        // Compute the actual games in the wishlist
        const wishlistGames = computed(() =>
            gamesList.value.filter(g => g.wishlisted)
        )

        // Helper to resolve cover image (static asset path)
        const getCover = filename => {
            try {
                return new URL(`../assets/${filename}`, import.meta.url).href
            } catch {
                return ''
            }
        }

        return {
            user,
            wishlistGames,
            getCover,
        }
    }
}
</script>

<style scoped>
.profile {
    color: #f2f2f2;
}

.profile h2 {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

/* Glass-card style reused from Games.vue */
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    border-radius: 12px;
}

.card-img-top {
    max-height: 150px;
    object-fit: cover;
}

/* Make card titles/text readable */
.profile .card-title {
    color: #f2f2f2;
}

.profile .card-body {
    color: #e0e0e0;
}
</style>