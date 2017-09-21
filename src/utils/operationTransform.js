import { Changeset } from 'changesets'
import DmpMod from 'diff_match_patch'

export default {
  computedChanges (text, textNew) {
    const dmp = new DmpMod.diff_match_patch()
    const diff = dmp.diff_main(text, textNew)
    const changeset = Changeset.fromDiff(diff)
    return changeset
  }
}
