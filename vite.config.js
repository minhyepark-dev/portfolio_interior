import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portfolio_interior/', // GitHub Pages 서브 디렉토리 설정
  define: {
    'process.env.VITE_KAKAO_MAP_API_KEY': JSON.stringify(
      process.env.VITE_KAKAO_MAP_API_KEY
    ),
  },
});
