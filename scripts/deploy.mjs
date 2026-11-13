import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

try {
  console.log('Building production bundle...');
  execSync('npm run build', { stdio: 'inherit' });

  const distDir = path.resolve('dist');

  // Get remote url from root git
  const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf-8' }).trim();
  if (!remoteUrl) {
    throw new Error('No git remote origin found.');
  }

  console.log(`\nDeploying dist to ${remoteUrl} (gh-pages branch)...`);

  const gitDir = path.join(distDir, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  execSync('git init', { cwd: distDir, stdio: 'inherit' });
  execSync('git checkout -b gh-pages', { cwd: distDir, stdio: 'inherit' });
  execSync('git add -A', { cwd: distDir, stdio: 'inherit' });
  execSync('git commit -m "Deploy to GitHub Pages"', { cwd: distDir, stdio: 'inherit' });
  execSync(`git push -f "${remoteUrl}" gh-pages`, { cwd: distDir, stdio: 'inherit' });

  // Clean up .git in dist
  fs.rmSync(gitDir, { recursive: true, force: true });

  console.log('\n Successfully deployed to GitHub Pages (gh-pages branch)!');
} catch (err) {
  console.error('\n Deployment failed:', err.message);
  process.exit(1);
}
