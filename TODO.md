# Git Push Fix TODO

## Steps:

- [ ] Step 1: Clear old Git credentials from Windows Credential Manager.
      Command: `cmdkey /list | findstr github` then `cmdkey /delete:git:https://github.com`
- [ ] Step 2: Fork https://github.com/Marciiiii25/thefolioM to your GitHub account (shilohjarsdel16/thefolioM) if not already.
- [ ] Step 3: Update remote origin to your fork.
      Command: `git remote set-url origin https://github.com/shilohjarsdel16/thefolioM.git`
- [ ] Step 4: Verify remote.
      Command: `git remote -v`
- [ ] Step 5: Commit any local changes if needed (`git add . && git commit -m "Update"`)
- [ ] Step 6: Push to mainM.
      Command: `git push -u origin mainM`
- [ ] Step 7: (Optional) Set upstream for original repo sync.
      Commands: `git remote add upstream https://github.com/Marciiiii25/thefolioM.git` then `git pull upstream main --allow-unrelated-histories`

**Next command to run: Clear credentials.**
