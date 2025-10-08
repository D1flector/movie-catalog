export default {
  // Эта строка говорит Jest'у использовать готовый набор настроек для TypeScript
  preset: 'ts-jest', 
  
  // Эта строка "симулирует" окружение браузера (DOM), понадобится для тестов компонентов
  testEnvironment: 'jsdom',
  
  // Эта "заглушка" говорит Jest'у, как игнорировать импорты стилей
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', 
  },
};