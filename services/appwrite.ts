import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  if (!query) return;

  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: "metrics",
      queries: [Query.equal("searchTerm", query)],
    });

    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];

      tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: "metrics",
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        },
      });

      console.log("found");
    } else {
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: "metrics",
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          count: 1,
        },
      });
      console.log("new entry");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await tablesDB.listRows(DATABASE_ID, "metrics", [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
