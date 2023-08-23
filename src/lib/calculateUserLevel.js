const calculateUserLevel = (pointsEarned) => {
    var points = 100;
    var level = 0;

    if (points > pointsEarned) {
        return level;
    }

    while (true) {
        pointsEarned -= points;
        points *= 1.1;
        level++;

        if (points > pointsEarned) {
            return level;
        }
    }
}

export default calculateUserLevel;