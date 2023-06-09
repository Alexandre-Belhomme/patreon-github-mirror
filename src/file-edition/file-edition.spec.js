const {updateListFile} = require('./file-edition.js')
const fs = require('fs')

test('File edition', () => {
    const path = require('path').resolve(__dirname, './_mocks/list.txt')
    fs.unlinkSync(path)
    fs.writeFileSync(path, '', 'utf8')

    updateListFile('Bob', 'RewardName', path);
    expect(fs.readFileSync(path, 'utf8')).toBe("Bob (RewardName)")

    updateListFile('Tom', 'NewRewardName', path);
    expect(fs.readFileSync(path, 'utf8')).toBe("Bob (RewardName)\nTom (NewRewardName)")

    updateListFile('Bob', 'UpgradedReward', path);
    expect(fs.readFileSync(path, 'utf8')).toBe("Tom (NewRewardName)\nBob (UpgradedReward)")

    updateListFile('Tom', 'NewRewardName', path);
    expect(fs.readFileSync(path, 'utf8')).toBe("Bob (UpgradedReward)\nTom (NewRewardName)")

    updateListFile('Bob', null, path);
    expect(fs.readFileSync(path, 'utf8')).toBe("Tom (NewRewardName)")
});