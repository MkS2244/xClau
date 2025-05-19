<x-mail::message>
# Nuevo pedido recibido!

Se ha creado el pedido **{{ $order->id }}** por el usuario **{{ $order->user->name }}** el {{ $order->created_at->format('d/m/Y H:i') }}.

** Total: {{ $order->total }} €**

** Productos:** 
@foreach ($order->products as $product)
- {{ $product->name }} ({{ $product->pivot->quantity }})
@endforeach

{{-- <x-mail::button :url="''">
Button Text
</x-mail::button> --}}

Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
