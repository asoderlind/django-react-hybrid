import SineWave from "../components/SineWave";

interface SignalPageViewProps {}

const SignalPageView: React.FC<SignalPageViewProps> = (props) => {
  return (
    <div>
      <h1>Signal Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, quibusdam, quia, quae voluptatem voluptas quod dolorum
        voluptatibus quos quas natus. Quisquam voluptatum, quibusdam, quia, quae
        voluptatem voluptas quod dolorum voluptatibus quos quas natus.
      </p>
      <SineWave />
    </div>
  );
};

export default SignalPageView;
