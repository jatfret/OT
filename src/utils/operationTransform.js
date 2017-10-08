import { Changeset } from 'changesets'
import DiffMatchPatch from 'diff-match-patch'
const dmp = new DiffMatchPatch()
export default {
  computedChanges (text, textNew) {
    const diff = dmp.diff_main(text, textNew)
    console.log('diff:', diff)
    const changeset = Changeset.fromDiff(diff)
    return changeset
  },
  getCursor (cursor, text, textNew) {
    const originLength = text.length
    if (originLength !== cursor) {
      let match = dmp.match_main(textNew, text.substring(cursor, cursor + 10), cursor)
      if (match >= 0) {
        cursor = match
      } else {
        let tempLength = cursor
        if (tempLength > 10) {
          tempLength = 10
        }
        match = dmp.match_main(textNew, text.substring(cursor - tempLength, cursor), cursor)
        if (match >= 0) {
          cursor = match + tempLength
        }
      }
    } else {
      cursor = textNew.length
    }
    return cursor
  }
}
