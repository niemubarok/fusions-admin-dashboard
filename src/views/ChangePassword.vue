<template>
  <main-section class="flex justify-center pt-20">
    <modal-box v-model="isModalActive" has-cancel has-divider>
      <feather-icon
        path="alert-triangle"
        w="50"
        h="50"
        size="50px"
        class="flex justify-center w-full text-red-400"
      />
      <div class="w-full bg-red-600 bg-opacity-20 h-10 pt-2 rounded-md">
        <span
          class="flex justify-center w-full text-gray-900 text-center font-lg"
        >
          Make sure you remember your new password! <br />
        </span>
      </div>
      <div class="pt-5 flex justify-center">Are you sure to continue?</div>

      <template #bottom>
        <jb-buttons class="float-right mt-10">
          <jb-button @click="submit" color="danger" label="Yes" />
          <jb-button
            @click="isModalActive = false"
            color="info"
            label="Cancel"
          />
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
    <div class="relative w-11/12 flex justify-center -mt-32 ">
      <background-decoration />
      <card-component
        class="w-11/12 md:w-5/12 bg-transparent rounded-lg pb-3 mt-5 shadow-lg"
        form
      >
        <div class="flex justify-center w-full mb-4">
          <logo />
        </div>
        <div
          class="flex justify-center w-full text-gray-500 text-center font-lg"
        >
          You are about to change your password
        </div>
        <div
          style="font-size: 10pt; margin-top: -2px; margin-bottom: 15px"
          class="flex justify-center w-full text-gray-500 font-xs"
        >
          <small> Please enter your old password then the new one </small>
        </div>

        <!-- old Password -->
        <div>
          <floating-label-input
            label="Old Password"
            :type="oldPassType"
            icon="lock"
            v-model="form.oldPassword"
            isPassword
          >
            <template #append>
              <feather-icon
                v-if="oldPassType !== 'password'"
                path="eye"
                @click="oldPassVisibility"
              />
              <feather-icon
                v-if="oldPassType == 'password'"
                path="eye-off"
                @click="oldPassVisibility"
              />
            </template>
          </floating-label-input>
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

        <back-button
          hasText
          text="Back"
          class="float-left pb-4 cursor-pointer text-blue-400 mt-16"
        />
      </card-component>
    </div>
  </main-section>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import MainSection from "@/components/MainSection";
import CardComponent from "@/components/CardComponent";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import ModalBox from "@/components/ModalBox";
import FloatingLabelInput from "../components/FloatingLabelInput.vue";
import Logo from "../components/Logo.vue";
import FeatherIcon from "../components/FeatherIcon.vue";
import Notification from "../components/Notification.vue";
import { useStore } from "vuex";
import BackgroundDecoration from "../components/BackgroundDecoration.vue";
import BackButton from "../components/BackButton.vue";

export default {
  name: "Login",
  components: {
    MainSection,
    CardComponent,
    // Divider,
    JbButton,
    JbButtons,
    ModalBox,
    // CheckRadioPicker,
    FloatingLabelInput,
    Logo,
    FeatherIcon,
    Notification,
    BackgroundDecoration,
    BackButton
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = reactive({
      oldPassword: "",
      isoldPasswordError: false,
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

    const oldPassType = ref("password");
    const newPassType = ref("password");
    const repeatPassType = ref("password");

    const notif = reactive({
      color: "",
      message: store.state.notification
    });

    const oldPassVisibility = () => {
      oldPassType.value = oldPassType.value == "password" ? "text" : "password";
    };
    const newPassVisibility = () => {
      newPassType.value = newPassType.value == "password" ? "text" : "password";
    };
    const repeatPassVisibility = () => {
      repeatPassType.value =
        repeatPassType.value == "password" ? "text" : "password";
    };

    const openModal = () => {
      if (form.oldPassword == "") {
        form.isoldPasswordError = true;
        notif.message = "Please provide your old password";
        notif.color = "danger";
      } else if (form.newPassword == "") {
        form.isoldPasswordError = false;
        form.isNewPasswordError = false;
        form.isRepeatNewPasswordError = true;
        notif.message = "Have you typed your new password?";
        notif.color = "danger";
      } else if (isNewPasswordMatched.value) {
        form.isoldPasswordError = false;
        form.isNewPasswordError = true;
        notif.message = "your new password doesn't matched";
        notif.color = "danger";
      } else {
        form.isoldPasswordError = false;
        form.isNewPasswordError = false;
        notif.message = "";
        isModalActive.value = true;
      }
    };

    const submit = async () => {
      await store.dispatch("changePassword", form);
      console.log("submit change password");

      if (store.state.isPasswordChanged) {
        notif.color = "success";
        isModalActive.value = false;
        notif.message = "Successfully changed your password";
        setTimeout(() => {
          router.push({ name: "dashboard" });
        }, 1000);
      } else {
        isModalActive.value = false;
        notif.color = "danger";
        notif.message = "Your old password is wrong";
      }
    };

    return {
      isModalActive,
      form,
      openModal,
      submit,
      mdiAccount,
      mdiAsterisk,
      oldPassType,
      newPassType,
      repeatPassType,
      oldPassVisibility,
      newPassVisibility,
      repeatPassVisibility,
      notif,
      isNewPasswordMatched
    };
  }
};
</script>
