import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  ChevronDoubleDownIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import propTypes from "prop-types";

export default function ComboBoxComp({
  propsOnChange,
  name,
  value,
  className,
  city,
}) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? city
      : city.filter((city) =>
          city
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const onChangeSelect = (value) => {
    propsOnChange({
      target: {
        name: name,
        value: value,
      },
    });
  };

  return (
    <div className={["w-full", className].join(" ")}>
      <Combobox
        value={value}
        onChange={(e) => {
          onChangeSelect(e);
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              placeholder="Cari kota disini..."
              className="w-full border-none outline-none py-2 pl-3 text-xs text-secondary-gray"
              displayValue={(city) => city}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {value === "" ? (
                <PlayIcon
                  className="h-3 w-3 text-secondary-gray rotate-90"
                  aria-hidden="true"
                />
              ) : (
                <XMarkIcon
                  className="h-3 w-3 text-secondary-gray rotate-90"
                  aria-hidden="true"
                  onClick={() => {
                    onChangeSelect("");
                  }}
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white z-50 py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm p-1">
              {filtered.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="relative cursor-default text-xs select-none rounded p-2 text-secondary-gray"
                >
                  Maaf, belum ada kota tersebut nih...
                </Combobox.Option>
              ) : (
                query.length >= 2 &&
                filtered.map((city, ind) => (
                  <Combobox.Option
                    key={ind}
                    className={({ active }) =>
                      `relative cursor-default text-xs select-none rounded p-2 ${
                        active
                          ? "bg-primary-orange text-white"
                          : "text-secondary-gray"
                      }`
                    }
                    value={city}
                  >
                    <span className={`block truncate`}>{city}</span>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

ComboBoxComp.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  propsOnChange: propTypes.func,
  className: propTypes.string,
  city: propTypes.array,
};
