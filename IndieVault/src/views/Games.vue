<template>
    <div class="games">
        <h2 class="text-center mb-4">Discover Indie Games</h2>

        <!-- Game grid -->
        <div class="row">
            <div class="col-md-4 mb-4" v-for="game in games" :key="game.id">
                <div class="card h-100 glass-card">
                    <img :src="getCover(game.cover)" class="card-img-top" :alt="game.title" />

                    <div class="card-body">
                        <h5 class="card-title">{{ game.title }}</h5>
                        <p class="card-text">{{ game.description }}</p>

                        <!-- Like + Wishlist Buttons -->
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-sm btn-outline-light" @click="likeGame(game)">
                                ❤️ {{ game.likes }}
                            </button>
                            <button class="btn btn-sm" :class="game.wishlisted ? 'btn-success' : 'btn-outline-success'"
                                @click="toggleWishlist(game)">
                                {{ game.wishlisted ? 'Wishlisted' : 'Wishlist' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gameData from '../assets/games.json'
import { reactive } from 'vue'

export default {
    name: 'Games',
    setup() {
        // Create a reactive copy so likes/wishlist update live
        const games = reactive(gameData.map(g => ({ ...g })))

        const likeGame = (game) => {
            game.likes++
        }

        const toggleWishlist = (game) => {
            game.wishlisted = !game.wishlisted
        }

        const getCover = (filename) => {
            try {
                return new URL(`../assets/${filename}`, import.meta.url).href
            } catch {
                return '' // fallback or default image path
            }
        }

        return {
            games,
            likeGame,
            toggleWishlist,
            getCover
        }
    }
}
</script>

<style scoped>
.games {
    color: #f2f2f2;
    padding-top: 2rem;
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
</style>