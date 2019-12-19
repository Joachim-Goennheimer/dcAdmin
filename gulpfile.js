const gulp = require('gulp');
const exec = require('child_process').exec;

const dockerContainerName = 'dcAdminFrontEndCont';

gulp.task('angular:test', runCommand('ng test'));
gulp.task('angular:e2e', runCommand('ng e2e'));
gulp.task('angular:lint', runCommand('ng lint'));
gulp.task('angular:build', runCommand('docker build -t dcadmin_frontend .'));
gulp.task('angular:run', runCommand('docker run -d --name ' + dockerContainerName + ' -p 4200:4200 dcadmin_frontend'));

gulp.task('run', gulp.series('angular:test', 'angular:e2e', 'angular:lint','angular:build', 'angular:run'));
gulp.task('start', runCommand('docker start ' + dockerContainerName));
gulp.task('stop', runCommand('docker stop ' + dockerContainerName));

gulp.task('docker:destroyContainer', runCommand('docker rm -f ' + dockerContainerName));
gulp.task('docker:destroyImage', runCommand('docker image rm dcadmin_frontend'));

gulp.task('destroy', gulp.series('docker:destroyContainer', 'docker:destroyImage'));



function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr); 
      cb(err);
    });
  };
}
