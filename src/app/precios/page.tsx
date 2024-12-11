"use client"
import React from 'react'
import PriceComponent from "@/components/price"
import Button from '@/components/ui/buton'
function PreciosPage() {
  return (
    <>
      <div>
        <section className="bg-[#a7a9ac]">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Precios</h2>
              <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Aqui podra ver los precios</p>
            </div>
            <div className='space-y-4 lg:grid-cols-2 sm:gap-6 xl:gap-2 lg:space-y-0'>

              <PriceComponent price={'500'} tipoPago={'Un unico Pago'} title={'Un solo pago'} description={'Pague una vez y olvidece'} />
              <Button/>
              <PriceComponent price={'500'} tipoPago={'Un unico Pago'} title={'Un solo pago'} description={'Pague una vez y olvidece'} />
            </div>

          </div>
        </section>
      </div>
    </>
  )
}

export default PreciosPage