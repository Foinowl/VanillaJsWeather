import cityJSON from './city.list.json'

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
    const results = cityJSON.filter((item) => {
			// regex to search for case insensitive data
			const regex = new RegExp(this.query, "gi")
			return item.name.match(regex) || item.country.match(regex)
	})
	this.results = results.filter(
		(location, i, self) =>
			i ===
			self.findIndex(
				(t) => t.name === location.name && t.country === location.country
			)
	)
    } catch (err) {
      console.log(err);
    }
  }
}
