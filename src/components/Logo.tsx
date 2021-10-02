const COLORS = {
  green: {
    main: "#9FE865",
    sub: "#98BF7A",
  },
  red: {
    main: "#DA6565",
    sub: "#9D5656",
  },
  undefined: {
    main: "#C0C2BE",
    sub: "#A4A7A3",
  },
};

const Logo = ({
  type = "green",
  width = 92,
  height = 83,
  alt = "datacenter indicator",
}: {
  type?: string;
  width?: number;
  height?: number;
  alt?: string;
}): React.ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 92 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{alt}</title>
      <path
        d="M62.5 20.5C62.5 31.8218 56.0081 41 48 41C39.9919 41 33.5 31.8218 33.5 20.5C33.5 9.17816 48 0 48 0C48 0 62.5 9.17816 62.5 20.5Z"
        fill={COLORS[type].sub}
      />
      <path
        d="M62 22.5C62 32.7173 56.1797 41 49 41C41.8203 41 36 32.7173 36 22.5C36 12.2827 49 4 49 4C49 4 62 12.2827 62 22.5Z"
        fill={COLORS[type].main}
      />
      <path
        d="M71.4643 73.8084C64.9287 78.7961 50.0885 76.147 46.8549 68.8207C43.6213 61.4945 57.2455 50.2223 65 51.5C75.9643 53.3066 85.5 51.5 85.5 51.5C85.5 51.5 78 68.8207 71.4643 73.8084Z"
        fill={COLORS[type].sub}
      />
      <path
        d="M70.0962 74.4346C64.0402 79.0562 50.2891 76.6015 47.2929 69.8129C44.2966 63.0244 56.9209 52.5795 64.1063 53.7634C74.2659 55.4373 83.1017 53.7634 83.1017 53.7634C83.1017 53.7634 76.1522 69.8129 70.0962 74.4346Z"
        fill={COLORS[type].main}
      />
      <path
        d="M8.70008 50C5.69811 40.6648 13.6673 36.0205 13.6673 25.3864C20.9908 22.1468 31.4508 30.5591 34.9068 40.0205C38.0327 48.5783 37.5774 59.6419 30.2538 62.8816C30.2538 62.8816 22.3949 64.775 18 62.8816C12.3017 60.4266 10.5995 55.9067 8.70008 50Z"
        fill={COLORS[type].sub}
      />
      <path
        d="M11.227 50.5507C8.44849 41.9104 15.8245 37.6117 15.8245 27.7693C22.6029 24.7707 32.2843 32.5569 35.483 41.314C38.3763 49.2348 37.9549 59.4749 31.1764 62.4735C31.1764 62.4735 23.9025 64.226 19.8347 62.4735C14.5606 60.2012 12.9851 56.0177 11.227 50.5507Z"
        fill={COLORS[type].main}
      />
      <path
        d="M29 76C29 76 44.4872 62.4682 47.8332 51.8689C50.4585 43.5529 47.8332 30 47.8332 30"
        stroke="#707070"
        strokeWidth="2.5"
      />
      <path
        d="M36 68.984C45.1956 69.1111 50.241 68.5165 59 66"
        stroke="#707070"
        strokeWidth="2"
      />
      <path
        d="M38 67C29.8378 62.9972 26.4925 58.0523 22 46"
        stroke="#707070"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Logo;