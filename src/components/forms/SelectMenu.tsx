import { SelectMenuOption } from '@/types'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

interface SelectMenuProps {
  title: string;
  options: SelectMenuOption[];
  onSelect: (option: SelectMenuOption | null) => void;
}

const emptyOption: SelectMenuOption = {
  key: null,
  label: 'Clear selection',
}

export default function SelectMenu({
  title,
  options,
  onSelect,
}: SelectMenuProps) {
  const [selected, setSelected] = useState<SelectMenuOption | null>(null)

  useEffect(() => {
    onSelect(selected)
  }, [selected])

  const fullOptions = useMemo(() => [emptyOption, ...options], [options])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <div className="inline-flex divide-x divide-slate-300 rounded-md border border-slate-300">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-slate-200 px-3 py-2 text-gray-900 shadow-sm">
                {selected?.key ? (
                  <>
                    <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    <p className="text-sm font-semibold">{selected?.label}</p>
                  </>
                ) : (
                  <p className="text-sm font-semibold">{title}</p>
                )}
              </div>
              <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-slate-200 p-2 hover:bg-slate-300">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-900"
                  aria-hidden="true"
                />
              </Listbox.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                {fullOptions.map((option) => (
                  <Listbox.Option
                    key={option.label}
                    className="text-gray-900 select-none p-4 text-sm cursor-pointer hover:bg-slate-200"
                    value={option}
                  >
                    {({ selected }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {option.label}
                          </p>
                        </div>
                        <p className="text-gray-500 mt-0.5">
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
