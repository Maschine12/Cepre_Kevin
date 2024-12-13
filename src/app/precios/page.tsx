"use client"
import React from 'react'
import PriceComponent from "@/components/price"
import Button from '@/components/ui/buton'

function PreciosPage() {
  return (
    <>
      <div>
        <section className="bg-white">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Precios</h2>
            </div>
            <div className='grid gap-16 sm:grid-cols-1 md:grid-cols-2 '>
              <PriceComponent price={'500'} tipoPago={'Un unico Pago'} title={'Un solo pago'} description={'El pago solo se realiza una vez por semestre'} />
              <PriceComponent price={'550'} tipoPago={'Pago en dos partes'} title={'Pago en partes'} description={'Se realizara el pago la fecha de inscripción y otra a la mitad del semestre que será de S/. 250 y S/. 200 soles'} />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default PreciosPage
