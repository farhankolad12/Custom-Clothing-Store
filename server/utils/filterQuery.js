async function filterQuery(searchParams, fields, Model) {
  const params = new URLSearchParams(searchParams);

  const currentPage = Number(params.get("page")) || 1;
  const pageSize = 5;

  const filterQuery = {
    $or: fields.map((field) => {
      return { [field]: { $regex: params.get("query") || "", $options: "i" } };
    }),
  };

  const totalDocuments = await Model.countDocuments(filterQuery);

  const data = await Model.find(filterQuery)
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))
    .sort({ createdAt: -1 });

  return {
    data,
    totalPages: Math.ceil(totalDocuments / pageSize),
    currentPage,
    totalDocuments,
    startDocument: pageSize * (currentPage - 1) + 1,
    lastDocument: pageSize * (currentPage - 1) + data.length,
  };
}

module.exports = filterQuery;
