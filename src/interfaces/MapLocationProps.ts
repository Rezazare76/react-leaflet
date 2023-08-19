export default interface MapLocationProps {
  selections: {
    origin: number[];
    destination: number[];
  };
  setSelections: React.Dispatch<
    React.SetStateAction<{
      origin: number[];
      destination: number[];
    }>
  >;
}
