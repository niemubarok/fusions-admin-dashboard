<template>
  <div
    class="px-0 py-6 md:px-6 h-screen mt-14 flex items-center justify-center"
  >
    <modal-box v-model="isModalActive" has-cancel has-divider>
      <feather-icon
        path="alert-triangle"
        w="50"
        h="50"
        size="50px"
        class="flex justify-center w-full text-red-400"
      />
      <div
        class="w-full bg-red-600 bg-opacity-20 h-20 rounded-md flex items-center"
      >
        <span
          class="flex justify-center w-full text-gray-900 text-center font-lg "
        >
          Make sure you remember your new password! <br />
        </span>
      </div>
      <div class="pt-5 flex justify-center">Are you sure to continue?</div>

      <template #bottom>
        <jb-buttons class="float-right mt-10">
          <jb-button
            @click="isModalActive = false"
            class="bg-gray-300 text-gray-600"
            label="Cancel"
          />
          <!-- color="info" -->
          <jb-button @click="submit" color="danger" label="Yes" />
        </jb-buttons>
      </template>
    </modal-box>

    <notification
      v-if="notif.message"
      :color="notif.color"
      class="absolute top-2 right-3"
    >
      {{ notif.message }}
    </notification>
    <card-component
      class="w-11/12 md:w-5/12 bg-transparent rounded-lg pb-3"
      form
    >
      <div class="flex justify-center w-full mb-4">
        <logo />
      </div>
      <div class="flex justify-center w-full text-gray-500 text-center font-lg">
        You are here because you've forgot your password
      </div>
      <div
        style="font-size: 10pt; margin-top: -2px; margin-bottom: 15px"
        class="flex justify-center w-full text-gray-500 font-xs"
      >
        <!-- <small> Please enter your new password </small> -->
        <small v-if="!isError"> Please enter your new password </small>

        <small v-else class="text-red-400 bg-red-100 px-2 rounded-sm mt-2">
          {{ errorMessage }}
        </small>
      </div>

      <!-- new password -->
      <div class="mt-4">
        <floating-label-input
          label="New Password"
          :type="newPassType"
          icon="lock"
          v-model="form.newPassword"
          isPassword
        >
          <template #append>
            <feather-icon
              v-if="newPassType !== 'password'"
              path="eye"
              @click="newPassVisibility"
            />
            <feather-icon
              v-if="newPassType == 'password'"
              path="eye-off"
              @click="newPassVisibility"
            />
          </template>
        </floating-label-input>
      </div>

      <!-- repeat new Password -->
      <div class="mt-4">
        <floating-label-input
          :type="repeatPassType"
          label="Repeat New Password"
          icon="lock"
          v-model="form.repeatNewPassword"
          isPassword
        >
          <template #append>
            <feather-icon
              v-if="repeatPassType !== 'password'"
              path="eye"
              @click="repeatPassVisibility"
            />
            <feather-icon
              v-if="repeatPassType == 'password'"
              path="eye-off"
              @click="repeatPassVisibility"
            />
          </template>
        </floating-label-input>
        <small
          v-if="
            form.repeatNewPassword !== '' &&
              form.newPassword !== form.repeatNewPassword
          "
          class="text-red-400"
          >Password doesn't match</small
        >
      </div>
      <jb-buttons class="float-right mt-10">
        <jb-button
          :class="{
            'cursor-not-allowed opacity-40 text-gray-200 bg-red hover:bg-gray-100': isNewPasswordMatched
          }"
          :isDisabled="isNewPasswordMatched"
          color="info"
          @click="openModal"
          label="Save new password"
        />
      </jb-buttons>

      <!-- <div
        @click="$router.go(-1)"
        class="float-left pb-4 cursor-pointer text-blue-400 mt-16"
      >
        <span class="inline-block align-middle">
          <feather-icon path="chevron-left"> </feather-icon>
        </span>
        <span class="-ml-2"> Back </span>
      </div> -->
    </card-component>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
// import MainSection from "@/components/MainSection";
import CardComponent from "@/components/CardComponent";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import ModalBox from "@/components/ModalBox";
import FloatingLabelInput from "../components/FloatingLabelInput.vue";
import Logo from "../components/Logo.vue";
import FeatherIcon from "../components/FeatherIcon.vue";
import Notification from "../components/Notification.vue";
import { useStore } from "vuex";

export default {
  name: "Login",
  components: {
    // MainSection,
    CardComponent,
    // Divider,
    JbButton,
    JbButtons,
    ModalBox,
    // CheckRadioPicker,
    FloatingLabelInput,
    Logo,
    FeatherIcon,
    Notification
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const token = computed({
      get: () => route.params.token
    });

    const isError = ref(false);
    const form = reactive({
      id: token.value,
      newPassword: "",
      isNewPasswordError: false,
      repeatNewPassword: "",
      isRepeatNewPasswordError: false
    });
    const isModalActive = ref(false);
    const isNewPasswordMatched = computed(() => {
      if (
        form.newPassword !== "" &&
        form.newPassword == form.repeatNewPassword
      ) {
        return false;
      } else {
        return true;
      }
    });
    const errorMessage = ref("");

    const newPassType = ref("password");
    const repeatPassType = ref("password");

    const notif = reactive({
      color: "",
      message: store.state.notification
    });

    const newPassVisibility = () => {
      newPassType.value = newPassType.value == "password" ? "text" : "password";
    };
    const repeatPassVisibility = () => {
      repeatPassType.value =
        repeatPassType.value == "password" ? "text" : "password";
    };

    const openModal = () => {
      if (form.newPassword == "") {
        form.isNewPasswordError = false;
        form.isRepeatNewPasswordError = true;
        notif.message = "Have you typed your new password?";
        notif.color = "danger";
      } else if (isNewPasswordMatched.value) {
        form.isNewPasswordError = true;
        notif.message = "your new password doesn't matched";
        notif.color = "danger";
      } else {
        form.isNewPasswordError = false;
        notif.message = "";
        isModalActive.value = true;
      }
    };

    const submit = async () => {
      await store.dispatch("resetPassword", form);

      if (store.state.isPasswordChanged) {
        notif.color = "success";
        isModalActive.value = false;
        notif.message = "Successfully changed your password";
        setTimeout(() => {
          router.push({ name: "login" });
        }, 1000);
      } else {
        isError.value = true;
        errorMessage.value = "There is an error occured";
        isModalActive.value = false;
        notif.color = "danger";
      }
    };
    onMounted(() => {
      console.log(token.value);
    });

    return {
      isModalActive,
      form,
      openModal,
      submit,
      mdiAccount,
      mdiAsterisk,
      newPassType,
      repeatPassType,
      newPassVisibility,
      repeatPassVisibility,
      notif,
      isNewPasswordMatched,
      errorMessage,
      isError
    };
  }
};
</script>
