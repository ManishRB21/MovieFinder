const useGenre = (filterGenre) => {
  if (filterGenre.length < 1) return "";

  const GenreIds = filterGenre.map((g) => g.id);
  return GenreIds.reduce((acc, curr) => acc + ", " + curr);
};

export default useGenre;
