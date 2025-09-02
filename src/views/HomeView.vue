<template>
  <div class="container py-4">
    <h1 class="display-5 mb-4 text-center">User Information Form</h1>

    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <form @submit.prevent="onSubmit" @reset="onReset" novalidate>
          <!-- Username -->
          <div class="mb-3">
            <label class="form-label" for="username">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              v-model.trim="formData.username"
              :class="{ 'is-invalid': submitted && errors.username }"
              placeholder="Enter your username"
            />
            <div class="invalid-feedback" v-if="submitted && errors.username">
              {{ errors.username }}
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label class="form-label" for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="formData.password"
              :class="{ 'is-invalid': submitted && errors.password }"
              placeholder="At least 8 characters"
            />
            <div class="invalid-feedback" v-if="submitted && errors.password">
              {{ errors.password }}
            </div>
          </div>

          <!-- Confirm Password (exactly following the Specification style for field + blur) -->
          

          <!-- Resident -->
          <div class="mb-3">
            <label for="confirm-password" class="form-label">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="confirm-password"
              v-model="formData.confirmPassword"
              @blur="() => validateConfirmPassword(true)"
            />
            <div v-if="errors.confirmPassword" class="text-danger">
              {{ errors.confirmPassword }}
            </div>
          </div>


          <!-- Reason -->
          <div class="mb-3">
            <label class="form-label" for="reason">Reason For Joining</label>
            <textarea
              id="reason"
              class="form-control"
              rows="3"
              v-model.trim="formData.reason"
              :class="{ 'is-invalid': submitted && errors.reason }"
              placeholder="Tell us a short reason (min 10 chars)"
            ></textarea>
            <div class="invalid-feedback" v-if="submitted && errors.reason">
              {{ errors.reason }}
            </div>
          </div>

          <!-- Gender -->
          <div class="mb-4">
            <label class="form-label" for="gender">Gender</label>
            <select
              id="gender"
              class="form-select"
              v-model="formData.gender"
              :class="{ 'is-invalid': submitted && errors.gender }"
            >
              <option disabled value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div class="invalid-feedback" v-if="submitted && errors.gender">
              {{ errors.gender }}
            </div>
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-secondary">Clear</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Simple submitted list (kept minimal) -->
    <div v-if="users.length" class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title mb-3">Submitted Users</h5>
        <DataTable :value="users" dataKey="id">
          <Column field="username" header="Username" />
          <Column header="Gender">
            <template #body="s">{{ s.data.gender }}</template>
          </Column>
          <Column header="Resident">
            <template #body="s">{{ s.data.isAustralian ? 'Yes' : 'No' }}</template>
          </Column>
          <Column field="reason" header="Reason" />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/* Use the Specification's data shape and names */
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

/* Use the Specification's error object keys */
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})

const users = ref([])
const submitted = ref(false)

/* Exactly the Specification's confirm-password validator */
const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

/* Beginner-friendly overall validation to keep the form safe */
function validateAll () {
  errors.value.username = null
  errors.value.password = null
  errors.value.reason = null
  errors.value.gender = null
  // keep any confirmPassword message that blur may have set
  // also enforce a submit-time safety check
  if (!formData.value.username) {
    errors.value.username = 'Username is required'
  } else if (formData.value.username.length < 3) {
    errors.value.username = 'Min 3 characters'
  }

  if (!formData.value.password) {
    errors.value.password = 'Password is required'
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'At least 8 characters'
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match.'
  }

  if (!formData.value.reason) {
    errors.value.reason = 'Reason is required'
  } else if (formData.value.reason.length < 10) {
    errors.value.reason = 'At least 10 characters'
  }

  if (!formData.value.gender) {
    errors.value.gender = 'Please select a gender'
  }

  return !(
    errors.value.username ||
    errors.value.password ||
    errors.value.confirmPassword ||
    errors.value.reason ||
    errors.value.gender
  )
}

/* Simple submit/reset handlers */
function onSubmit () {
  submitted.value = true
  if (!validateAll()) return

  users.value.push({
    id: Date.now().toString(),
    username: formData.value.username,
    isAustralian: formData.value.isAustralian,
    reason: formData.value.reason,
    gender: formData.value.gender
  })

  onReset()
  submitted.value = false
}

function onReset () {
  formData.value.username = ''
  formData.value.password = ''
  formData.value.confirmPassword = ''
  formData.value.isAustralian = false
  formData.value.reason = ''
  formData.value.gender = ''
  errors.value.username = null
  errors.value.password = null
  errors.value.confirmPassword = null
  errors.value.reason = null
  errors.value.gender = null
}
</script>

<style scoped>
.card-title { font-weight: 600; }
</style>
