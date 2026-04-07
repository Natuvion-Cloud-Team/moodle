# tiny_codesampleabap - ABAP syntax highlighting for TinyMCE

This Moodle TinyMCE subplugin adds ABAP to the code sample language dropdown
and enables syntax highlighting for ABAP in both the editor and on rendered pages.

## How it works

The TinyMCE codesample plugin bundles its own copy of PrismJS with a fixed set
of languages. Rather than modifying TinyMCE vendor files, this plugin:

1. Imports the codehighlighter filter's PrismJS (which we extend with the ABAP
   grammar) and exposes it as `window.Prism`.
2. Sets `codesample_global_prismjs: true` so the codesample plugin uses the
   global PrismJS instead of its bundled copy.
3. Sets `codesample_languages` to include ABAP in the language dropdown.

This approach avoids modifying any TinyMCE vendor files.

## Files modified outside this plugin

The ABAP grammar definition is appended to `public/filter/codehighlighter/amd/src/prism.js`.

This is the only file outside this plugin directory that is modified. It is a
vendored copy of PrismJS that Moodle maintains manually.
See `public/filter/codehighlighter/readme_moodle.txt` for upstream upgrade steps.

## Deployment

This patch is not merged into Moodle's main branch. Instead, the
`feat/add-abap-syntax-highlighting` branch is based on the deployed Moodle
release tag (e.g. `v5.1.3`). A patch file is generated from this branch and
applied during the Docker image build.

### Generating the patch file

```shell
git format-patch v5.1.3..feat/add-abap-syntax-highlighting --stdout \
  > ~/natuvion/charts/docker/moodle/patches/abap-syntax-highlighting.patch
```

Replace `v5.1.3` with the current base tag.

## Upgrading to a new Moodle release

When upgrading Moodle (e.g. from v5.1.3 to v5.2.0):

1. Fetch the new tag:

```shell
git fetch https://github.com/moodle/moodle.git refs/tags/v5.2.0:refs/tags/v5.2.0
```

2. Rebase the patch branch onto the new tag:

```shell
git rebase --onto v5.2.0 v5.1.3 feat/add-abap-syntax-highlighting
```

If there are conflicts, resolve them. The most likely conflict is in
`prism.js` if Moodle upgraded their bundled PrismJS. In that case, re-append
the ABAP grammar before the `// restore the original Prism reference` line.

3. Rebuild the minified files:

```shell
npm install && npx grunt amd
```

4. Amend the commit with updated build artifacts:

```shell
git add -A && git commit --amend --no-edit
```

5. Push the new tag and the updated branch to the fork:

```shell
git push origin v5.2.0
git push origin feat/add-abap-syntax-highlighting --force
```
