module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir: 'src/sass/',
          cssDir: 'src/styles/',
          environment: 'production',
        },
      },
    },
    watch: {
      css: {
        files: ['src/sass/*.scss'],
        tasks: ['compass'],
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.registerTask('default', ['compass']);
};