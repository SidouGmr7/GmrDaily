const fs = require("fs")
const path = require("path")
const dailyFilePath = path.join(__dirname, "Data", "daily.json")
const treePeople = require("./Data/treePeople.json")

let daily = require(dailyFilePath)

module.exports = () => {
  const data = {
    daily,
    treePeople,
  }
  return data
}

function saveDailyData() {
  fs.writeFile(dailyFilePath, JSON.stringify(daily), (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log("Daily data saved successfully!")
    }
  })
}

// Listen for changes to the daily data and save them to file
Object.defineProperty(data, "daily", {
  get() {
    return daily
  },
  set(newValue) {
    daily = newValue
    saveDailyData()
  },
  enumerable: true,
  configurable: true,
})
