import { formatCurrency } from "@/app/utils/formatCurrency";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

export default function MultiRangeSlider({
  min,
  max,
  onChange,
  handlePrice,
}: {
  min: number;
  max: number;
  onChange: Function;
  handlePrice: Function;
}) {
  const searchParams = useSearchParams();

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null!);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <>
      <input
        type="range"
        value={Number(searchParams.get("min")) || minVal}
        min={min}
        max={max}
        onMouseUp={() => handlePrice()}
        onTouchEnd={() => handlePrice()}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={minVal > max - 100 ? { zIndex: 5 } : {}}
        // style={{ zIndex: minVal > max - 100 && 5 }}
      />
      <input
        type="range"
        onMouseUp={() => handlePrice()}
        onTouchEnd={() => handlePrice()}
        value={Number(searchParams.get("max")) || maxVal}
        min={min}
        max={max}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">
          {formatCurrency(Number(searchParams.get("min")) || minVal)}
        </div>
        <div className="slider__right-value">
          {formatCurrency(Number(searchParams.get("max")) || maxVal)}
        </div>
      </div>
    </>
  );
}
