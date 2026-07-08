const token = "skJObdOheDZCV0DCx364eJIf6XEzSrmZM0lMQtWiNUfT6UmySXrdMRp9tipzUnK53FVnd2VPhPIiCl1QisXe0RhsfDC3KBdpvjU25KNh8jsgbryWfcLnvjHaXdUlc7n607nZnLAoHHxtrDCnPxo1V3q8he37Wmobpga6GWTP8zDs0m031k3M";
const projectId = "mnv60h0l";
const dataset = "production";

const doc = {
  _id: "blogs.test-id",
  _type: "blog",
  title: "Test Blog"
};

const mutations = [
  {
    createOrReplace: doc
  }
];

fetch(`https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({ mutations })
})
  .then(res => res.json())
  .then(data => {
    console.log("Mutation Response:", JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error("Error mutating:", err);
  });
