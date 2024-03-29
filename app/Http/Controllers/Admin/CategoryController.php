<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data["categories"] = Category::orderBy("id", "desc")->paginate(5);
        return view("admin.category.category")->with($data);
    }

    public function getAllcategory()
    {
        $data["categories"] = Category::orderBy("id", "desc")->paginate(5);
        return view("admin.category.getAllcategory")->with($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|unique:categories",
            "active" => "required",
        ]);
        if ($validator->fails())
            return response()->json($validator->errors());
        else {
            $category = new Category();
            $category->saveCategoryInfo($request, $category);
            return response()->json("seccess");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categoty = Category::find($id);
        return $categoty;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $categoty = Category::find($id);
        return $categoty;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|unique:categories,name,". $id,
            "active" => "required",
        ]);
        if ($validator->fails())
            return response()->json($validator->errors());
        else {
            $category = Category::find($id);
            $category->saveCategoryInfo($request, $category);

            return response()->json("seccess");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json("delete");
    }
    
    public function categorySearch()
    {
        $key = \Request::get("key");

        if ($key != null)
        {
            $data["categories"] = Category::where("name", "LIKE", "%$key%")
                                            // ->orWhere("description", "LIKE", "%$key%")
                                            ->orderBy("id", "desc")
                                            ->paginate(5);
        } else {
            $data["categories"] = Category::orderBy("id", "desc")->paginate(5);
        }

        return view("admin.category.getAllcategory")->with($data);
    }
}
