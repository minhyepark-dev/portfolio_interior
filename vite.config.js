import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portfolio_interior/', // GitHub Pages 서브 디렉토리 설정
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'login.html',
        join: 'join.html',
        community: 'community.html',
        department: 'department.html',
        gallery: 'gallery.html',
        join_result: 'join_result.html',
        location: 'location.html',
        youtube: 'youtube.html',
      },
    },
  },
});
