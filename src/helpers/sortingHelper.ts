type IOptions = {
  page?: number | string;
  limit?: number | string;
  sortOrder?: "asc" | "desc" | string;
  sortBy?: string;
};

type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
};
const sortingHelper = (options: IOptions): IOptionResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy =
    typeof options.sortBy === "string" &&
    ["createdAt", "totalAmount", "status"].includes(options.sortBy)
      ? options.sortBy
      : "createdAt";

  const sortOrder =
    options.sortOrder === "asc" || options.sortOrder === "desc"
      ? options.sortOrder
      : "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default sortingHelper;
