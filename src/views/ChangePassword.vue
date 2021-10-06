<template>
  <main-section class="flex justify-center pt-20">
    <modal-box v-model="isModalActive" button-label="Yes" has-cancel>
      <div class="flex justify-center w-full text-gray-700 text-center font-lg">
        Are you sure?
      </div>

      <!-- <floating-label-input icon="mail" label="Your email" /> -->

      <!-- <template #bottom>
        <a
          @click="isModalActive = false"
          class="float-right mb-4 cursor-pointer text-blue-400"
          >Back to login</a
        >
      </template> -->
    </modal-box>
    <card-component
      class="w-11/12 md:w-5/12 bg-transparent rounded-lg"
      @submit.prevent="submit"
      form
    >
      <!-- <div class="flex justify-center w-full ">
        <logo class="mb-3" />
      </div> -->
      <div class="flex justify-center w-full text-gray-500 text-center font-lg">
        You are about to change your password
      </div>
      <div
        style="font-size:10pt;margin-top:-2px;margin-bottom:15px"
        class="flex justify-center w-full text-gray-500 font-xs "
      >
        <small>
          Please enter your new password
        </small>
      </div>
      <div>
        <floating-label-input
          label="New Password"
          :type="repeatPassType"
          inputId="password"
          icon="lock"
          v-model="form.login"
        />
      </div>

      <div class="mt-4">
        <floating-label-input
          :type="repeatPassType"
          label="Repeat New Password"
          icon="lock"
          inputId="rpassword"
          v-model="form.pass"
        >
          <template #append>
            <!-- <feather-icon
              v-if="repeatPassType !== 'password'"
              path="eye"
              @click="togglePasswordVisibility"
            />
            <feather-icon
              v-if="repeatPassType == 'password'"
              path="eye-off"
              @click="togglePasswordVisibility"
            /> -->
          </template>
        </floating-label-input>
      </div>

      <div class="mt-3 float-right text-gray-500">
        <check-radio-picker
          name="showPassword"
          v-model="form.remember"
          :options="{ show: 'Show Password' }"
          @change="togglePasswordVisibility"
        />
      </div>

      <divider class="mt-20"/>
      <jb-buttons>
        <jb-button type="submit" color="info" label="Save new password" />
      </jb-buttons>

      <div class="float-right mb-4 cursor-pointer text-blue-400">
        <a @click="$router.go(-1)">back</a>
      </div>
    </card-component>
  </main-section>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import MainSection from "@/components/MainSection";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import ModalBox from "@/components/ModalBox";
import Logo from "@/components/Logo";
import FeatherIcon from "../components/FeatherIcon.vue";
import FloatingLabelInput from "../components/FloatingLabelInput.vue";

export default {
  name: "Login",
  components: {
    MainSection,
    CardComponent,
    Divider,
    JbButton,
    JbButtons,
    ModalBox,
    // Logo,
    CheckRadioPicker,
    FloatingLabelInput
    // FeatherIcon
  },
  setup() {
    const form = reactive({
      login: "",
      pass: "",
      remember: false
    });
    const isModalActive = ref(false);

    const repeatPassType = ref("password");

    const togglePasswordVisibility = () => {
      repeatPassType.value =
        repeatPassType.value == "password" ? "text" : "password";
    };

    const router = useRouter();

    const submit = () => {
      isModalActive.value = true;
      //   router.push("/dashboard");
    };

    return {
      isModalActive,
      form,
      submit,
      mdiAccount,
      mdiAsterisk,
      repeatPassType,
      togglePasswordVisibility
    };
  }
};
</script>
