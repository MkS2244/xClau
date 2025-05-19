<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use function Termwind\parse;

class ReactAdminResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->routeIs('*.index')) {
            $request->merge(['perPage' => 10]);
            $paramStart = $request->_start ?? 1;
            if ($request->filled('_end')) {
                $request->merge(['perPage' => 1 + $request->_end - $paramStart]);
            }
            $request->merge(['page' => intval($paramStart / $request->perPage) + 1]);

            $controller = $request->route()->getController();
            $modelClassName = $controller->modelclass;
            $query = self::applyFilter($request, $modelClassName::$filterColumns);
            $query = self::applySort($request, $query);
            $request->attributes->set('queryWithParameters', $query);
        }
        $response = $next($request);
        if ($request->routeIs('*.index')) {
            abort_unless(property_exists($request->route()->controller, 'modelclass'), 500, "It must exists a modelclass property in the controller.");
            $modelClassName = $request->route()->controller->modelclass;
            $response->header('X-Total-Count', $modelClassName::count());
        }
        try {
            if (is_callable([$response, 'getData'])) {
                $responseData = $response->getData();
                if (isset($responseData->data)) {
                    $response->setData($responseData->data);
                }
            }
        } catch (\Throwable $th) {
        }
        return $response;
    }

    public static function applyFilter($request, $filterColumns)
    {
        $modelClassName = $request->route()->controller->modelclass;
        $query = $modelClassName::query();
        $filterValue = $request->q;

        if ($filterValue) {
            $query->where(function ($query) use ($filterValue, $filterColumns) {
                foreach ($filterColumns as $column) {
                    $query->orWhere($column, 'like', '%' . $filterValue . '%');
                }
            });
        }
        return $query;
    }

    public static function applySort($request, $query)
    {
        $sort = $request->_sort ?? 'id';
        $order = $request->_order ?? 'asc';

        if ($sort) {
            $query->orderBy($sort, $order);
        }
        return $query;
    }
}