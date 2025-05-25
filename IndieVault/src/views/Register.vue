<template>
    <div class="register-page container py-5">
        <!-- Hero section -->
        <section class="hero-section text-center mb-4">
            <h2 class="display-6 fw-bold">Create an Account</h2>
            <p class="hero-subtext">
                Join IndieVault to browse, wishlist, and review your favorite indie games.
            </p>
        </section>

        <!-- Glassy registration form -->
        <form @submit.prevent="handleRegister" class="glass-card p-4 mx-auto" style="max-width: 400px;">
            <!-- Name -->
            <div class="mb-3">
                <label for="name" class="form-label custom-label">Name</label>
                <input v-model="name" type="text" id="name" class="form-control custom-input" required />
            </div>

            <!-- Email -->
            <div class="mb-3">
                <label for="email" class="form-label custom-label">Email</label>
                <input v-model="email" type="email" id="email" class="form-control custom-input" required />
            </div>

            <!-- Password -->
            <div class="mb-3">
                <label for="password" class="form-label custom-label">Password</label>
                <input v-model="password" type="password" id="password" class="form-control custom-input" required
                    minlength="4" />
            </div>

            <!-- Role selector -->
            <div class="mb-3">
                <label class="form-label custom-label">Register as:</label>
                <select v-model="role" class="form-select custom-input">
                    <option value="user">Regular User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <!-- Error message -->
            <div v-if="errorMessage" class="alert custom-alert">
                {{ errorMessage }}
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn custom-btn w-100">
                Register
            </button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import auth from '../store/auth'
import { useRouter } from 'vue-router'

export default {
    name: 'Register',
    setup() {
        const name = ref('')
        const email = ref('')
        const password = ref('')
        const role = ref('user')
        const errorMessage = ref('')
        const router = useRouter()

        const handleRegister = () => {
            errorMessage.value = ''
            const success = auth.register(name.value, email.value, password.value, role.value)
            if (!success) {
                errorMessage.value = 'Email already exists.'
                return
            }
            router.push('/')
        }

        return {
            name,
            email,
            password,
            role,
            errorMessage,
            handleRegister
        }
    }
}
</script>

<style scoped>
.register-page {
    color: #f2f2f2;
}

/* Hero section styling */
.hero-section {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 12px;
    padding: 1rem;
    color: #f2f2f2;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

.hero-subtext {
    color: #cccccc;
    font-size: 1rem;
}

/* Glassy card for form */
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 16px;
    color: #e2e2e2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Labels */
.custom-label {
    color: #ddd;
    font-weight: 500;
}

/* Inputs & select */
.custom-input {
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #f2f2f2;
    transition: border 0.3s ease, background 0.3s ease;
}

.custom-input::placeholder {
    color: #aaa;
}

.custom-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.08);
}

/* Error alert */
.custom-alert {
    background-color: rgba(220, 53, 69, 0.2);
    border-color: rgba(220, 53, 69, 0.4);
    color: #fff;
    margin-bottom: 1rem;
}

/* Button styling */
.custom-btn {
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #f2f2f2;
    font-weight: 600;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    transition: background 0.3s ease, transform 0.2s ease;
}

.custom-btn:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
}

/* Ensure typed text is visible */
.register-page .form-control {
    color: #f2f2f2;
    caret-color: #f2f2f2;
}
</style>