<template>
  <div class="tip-calculator">
    <h1 class="tip-calculator__title">LeTipCalculator</h1>
    <div class="tip-calculator__content">
      <div class="tip-calculator__form">
        <div class="tip-calculator__form-group">
          <span class="tip-calculator__currency-label">EUR</span>
          <BaseToogleInput
            class="tip-calculator__toggle-input"
            @currency="handleCurrencyChange"
          />
          <span class="tip-calculator__currency-label">USD</span>
        </div>
        <div class="tip-calculator__form-group">
          <p class="tip-calculator__currency">Valor: {{ currency }}</p>
          <BaseInput
            class="tip-calculator__input"
            :type="'number'"
            :inputAttrs="{ placeholder: 'Digite o valor da conta' }"
            v-model="countValue"
          />
        </div>
        <BaseInputRange
          class="tip-calculator__input-range"
          label="Gorjeta"
          :contentLabel="'%'"
          v-model="tipPercent"
          :min="10"
          :max="20"
          :step="1"
          :inputAttrs="{ class: 'custom-range' }"
        />
        <BaseInputRange
          class="tip-calculator__input-range"
          label="Número de Pessoas"
          v-model="peopleCount"
          :min="2"
          :max="16"
          :step="1"
          :inputAttrs="{ class: 'custom-range' }"
        />
      </div>
      <div class="tip-calculator__info">
        <h3 class="tip-calculator__info-title">Valor da Conta</h3>
        <p class="tip-calculator__info-value">{{ formattedCountValue }}</p>
        <h3 class="tip-calculator__info-title">Gorjeta</h3>
        <p class="tip-calculator__info-value">{{ formattedTip }}</p>
        <h3 class="tip-calculator__info-title">Total da Conta</h3>
        <p class="tip-calculator__info-value">{{ formattedTotal }}</p>
        <h3 class="tip-calculator__info-title">Por Pessoa</h3>
        <p class="tip-calculator__info-value">{{ formattedPerPerson }}</p>
        <h3 class="tip-calculator__info-title">em Reais</h3>
        <p class="tip-calculator__info-value">R$ {{ formattedPerPersonBRL }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseToogleInput from "@/components/Inputs/BaseToogleInput.vue";
import BaseInputRange from "@/components/Inputs/BaseInputRange.vue";
import BaseInput from "../Inputs/BaseInput.vue";
import { getCurrencyExchange } from "@/services/client";

export default {
  name: "LeTipCalculator",
  components: {
    BaseToogleInput,
    BaseInput,
    BaseInputRange,
  },
  data() {
    return {
      currency: "$",
      countValue: 0,
      tipPercent: 10,
      peopleCount: 2,
      toCurrency: "BRL",
      fromCurrency: "USD",
      exchangeRate: "",
      currencySymbols: {
        USD: "$",
        EUR: "€",
      },
    };
  },
  computed: {
    formattedCountValue() {
      return this.formatCurrency(this.countValue);
    },
    formattedTip() {
      return this.formatCurrency(this.tipValue);
    },
    formattedTotal() {
      return this.formatCurrency(this.totalValue);
    },
    formattedPerPerson() {
      return this.formatCurrency(this.perPersonValue);
    },
    formattedPerPersonBRL() {
      const valueInBRL = this.perPersonValue * parseFloat(this.exchangeRate);
      return this.formatCurrencyBRL(valueInBRL);
    },
    tipValue() {
      const count = parseFloat(this.countValue) || 0;
      return (count * this.tipPercent) / 100;
    },
    totalValue() {
      return (parseFloat(this.countValue) || 0) + this.tipValue;
    },
    perPersonValue() {
      return this.peopleCount ? this.totalValue / this.peopleCount : 0;
    },
  },
  watch: {
    fromCurrency(newCurrency, oldCurrency) {
      if (newCurrency && newCurrency !== oldCurrency) {
        this.fetchExchangeRate();
      }
    },
  },
  methods: {
    handleCurrencyChange(newCurrency) {
      this.currency = this.currencySymbols[newCurrency] || newCurrency;
      this.fromCurrency = newCurrency;
    },
    formatCurrency(value) {
      const num = parseFloat(value) || 0;
      return `${this.currency} ${num.toFixed(2)}`;
    },
    formatCurrencyBRL(value) {
      const num = parseFloat(value) || 0;
      return `${num.toFixed(2)}`;
    },
    async fetchExchangeRate() {
      try {
        const result = await getCurrencyExchange(
          this.fromCurrency,
          this.toCurrency
        );
        this.exchangeRate =
          result[`${this.fromCurrency}${this.toCurrency}`].ask;
      } catch (error) {
        console.error("Erro ao obter a taxa de câmbio:", error);
      }
    },
  },
  mounted() {
    this.fetchExchangeRate();
  },
};
</script>

<style scoped>
.tip-calculator {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 2rem 4rem;
  border-radius: 1rem;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tip-calculator__content {
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
}

.tip-calculator__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 50%;
}

.tip-calculator__form-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.tip-calculator__currency {
  width: 30%;
}

.tip-calculator__currency-label {
  font-weight: bold;
}

.tip-calculator__input {
  width: 100%;
}

.tip-calculator__input-range {
  width: 100%;
}

.tip-calculator__info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
}

.tip-calculator__info-title {
  margin: 0.5rem 0;
}

.tip-calculator__info-value {
  margin: 0;
  font-weight: bold;
}
</style>
